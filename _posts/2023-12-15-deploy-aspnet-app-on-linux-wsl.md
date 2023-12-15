---
title: Deploy ASP .NET no Linux [WSL]
author: renanduart3
date: 2023-12-15 16:00:00
categories: [Tutorial]
tags: [tutorial, wsl, linux, dotnet 6, deploy wsl]
---

### 💻 01 Instalar o .NET Core Runtime no Servidor

```bash
# Baixar o pacote do .NET Core Runtime
wget https://packages.microsoft.com/config...
sudo dpkg -i packages-microsoft-prod.deb

# Atualizar repositórios e instalar o SDK do .NET Core 6.0
sudo apt update
sudo apt install apt-transport-https
sudo apt install dotnet-sdk-6.0
```

### 💻 02 Verificar a Versão do Dotnet

```bash
dotnet --version
```

### 💻 03 Instalar o Nginx no Servidor

```bash
# Atualizar repositórios e instalar o Nginx
sudo apt update
sudo apt install nginx

# Verificar o status do Nginx
systemctl status nginx
```

### Corrigindo o erro "System has not been booted with systemd as init system"

Se você está seguindo algum tutorial na internet e usou o comando systemd como sudo systemctl start.

Para sua surpresa, o comando resulta em um erro como este:

>System has not been booted with systemd as init system (PID 1). Can't operate.{: .prompt-danger }

#### Razão: Seu sistema Linux não está usando o systemd {: .prompt-tip }

|Comando Systemd   | Comando Sysvinit  |
|---|---|
|systemctl start service_name   | service service_name start  |
|systemctl status service_name  | service service_name status |
|   |   |

Basta usar o comando equivalente do Sysvinit para corrigir, no nosso caso aqui:
```
service nginx start
service nginx status
```
### 💻 04 Publicar a Aplicação a partir do VS Code

```bash
# Publicar a aplicação
dotnet publish -c Release -r linux-x64 --self-contained true
cd /var/www/RealTimeChatApp
```

### 💻 4.1 Copiar Arquivos para o Servidor

```bash
# Substituir user, server_ip e /path/to/destination pelos valores apropriados
scp -r bin/Release/netcoreapp3.1/linux-x64/publish/* user@server_ip:/path/to/destination
```

### 💻 05 Configurar o Nginx

```bash
# Editar o arquivo de configuração do Nginx
nano /etc/nginx/sites-available/myapp
```

```nginx
server {
    listen 80;
    server_name mydomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 💻 06 Substituir mydomain.com pelo seu domínio ou endereço IP do servidor.

### 💻 07 Criar um Link Simbólico para Ativar a Configuração do Site

```bash
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
```

### 💻 08 Gerenciar o Processo do Nginx
#### Para Systemd
```bash
sudo systemctl stop nginx
sudo systemctl start nginx
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo systemctl disable nginx
sudo systemctl enable nginx
```
#### Para Sysvinit
```bash
sudo service nginx stop
sudo service nginx start
sudo service nginx restart
sudo service nginx reload
sudo service nginx disable
sudo service nginx enable
```

Parabéns! Sua aplicação .NET Core agora está configurada e sendo servida pelo Nginx. Certifique-se de substituir todas as informações específicas do servidor pelos valores corretos.