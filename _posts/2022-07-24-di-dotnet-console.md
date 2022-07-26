---
title: Configurando o container de DI no .NET Core +
author: renanduart3
date: 2022-07-26 09:00:00
categories: [dotnet core +, Tutorial]
tags: [dotnet injeção de dependência, .net core, .net,console-application,webapp]
---

Aqui vai um exemplo simples e rápido de como colocar o container de injeção de dependências do .NET em uma aplicação console nas versões do **.NET 5+**
> `.NET Core 3.x +` testado na versão core 3.1, dotnet 5 e dotnet 6.
{: .prompt-tip }

###Configurando o container em uma web app .net

A maneira mais comum e facil é instanciar os seus objetos de serviços nas web apps, que ja vem nas classes `Startup` do `.NET Core` e
na `Program` do `NET 5` e `NET 6`.

####.NET CORE 2+ - Classe Startup
```c#
public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // Esse método é chamado durante o tempo de execução. Use-o para adicionar servições ao container de DI.
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddMvc();
        services.AddLogging();
        services.AddMongoDB(Configuration);
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddSingleton<IActivityRepository, ActivityRepository>();
        services.AddTransient<CustomMongoSeeder>();

    }
    ...
}
```

####.NET 5 e 6 - Classe Program
> Lembrando que as classes Program do NET 5 e 6, com a atualização do .NET, eles oferecem algo chamado top level statment,
 que eu realmente não sei o que é de fato ainda mas percebe-se que utilizando essa marcação, a classe Program vem sem o `static void Main(string[] args){}`
mas o funcionamento é o mesmo aparentemente.
```c#

var builder = WebApplication.CreateBuilder(args);
...
#region [DI]

builder.Services.AddSingleton(typeof(IMongoRepository<>), typeof(MongoRepository<>));
builder.Services.AddSingleton<NewsService>();
builder.Services.AddScoped(typeof(IAlgumRepository<>), typeof(AlgumRepository<>));
builder.Services.AddSingleton<IActivityRepository, ActivityRepository>();
builder.Services.AddTransient<CustomMongoSeeder>();

#endregion
...
app.Run();

```
Com a classe padrao fica facil instanciar os containeres, só utilizar o objeto `builder`, acessar o objeto `Services` e adicionar seguindo os 3 modelos, Singleton,Scoped e Transient.


###Configurando o ambiente Console
Já com o console, fica um pouco diferente, pq vc não tem a classe construida ao criar o esqueleto do projeto, dai vc tem que criar na mão.
E fica algo mais ou menos assim:
> Dentro da classe Program do esqueleto montado com o `dotnet new` via CLI ou criar novo projeto pelo VS 2019 ou 2022.
```c#

//Adicionando o service collection
var serviceCollection = new ServiceCollection();
//configurar o serviço
serviceCollection.AddSingleton<DIContainer>();
serviceCollection.AddScoped<DIContainer>();
serviceCollection.AddTransient<DIContainer>();

//Criar o serviço e adiciona-lo ao container
var serviceProvider = serviceCollection.BuildServiceProvider();

//Caso queira verificar o serviço gerado
var service1 = serviceProvider.CreateScope().ServiceProvider.GetRequiredService<DIContainer>();
```

Bom, é isso, cada um seguindo o escopo de criação para Singleton, Scoped e Transient.

vlw flw 
💪😎

