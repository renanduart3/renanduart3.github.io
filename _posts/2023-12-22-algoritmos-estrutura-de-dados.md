---
title: Algoritmos e estrutura de dados com C#
author: renanduart3
date: 2023-12-15 16:00:00
categories: [Blogging]
tags: [estrutura-de-dados,c#, algoritmos]
---

# Algoritmos e Estruturas de Dados em C#

Neste post, vou mostrar alguns exemplos de algoritmos e estruturas de dados comuns em C#, como arrays, listas, listas ligadas, hashsets, quicksort, tabela hash, fila, pilha, árvore e grafos.

## Arrays

Um array é uma coleção de elementos do mesmo tipo, que são armazenados em posições consecutivas da memória. Para criar um array em C#, usamos a seguinte sintaxe:

```csharp
// Criar um array de inteiros com 10 elementos
int[] array = new int[10];

// Atribuir valores aos elementos do array
array[0] = 1;
array[1] = 2;
array[2] = 3;
// ...

// Acessar os elementos do array
Console.WriteLine(array[0]); // Imprime 1
Console.WriteLine(array[1]); // Imprime 2
Console.WriteLine(array[2]); // Imprime 3
// ...
```

Para percorrer todos os elementos de um array, podemos usar um laço for ou um laço foreach:

```csharp
// Usando um laço for
for (int i = 0; i < array.Length; i++)
{
    Console.WriteLine(array[i]); // Imprime cada elemento do array
}

// Usando um laço foreach
foreach (int element in array)
{
    Console.WriteLine(element); // Imprime cada elemento do array
}
```

## Listas

Uma lista é uma coleção de elementos que podem ser de tipos diferentes, e que permite adicionar e remover elementos dinamicamente. Para criar uma lista em C#, usamos a classe `List<T>`, onde `T` é o tipo dos elementos da lista. Por exemplo:

```csharp
// Criar uma lista de strings
List<string> list = new List<string>();

// Adicionar elementos à lista
list.Add("Bing");
list.Add("Google");
list.Add("Yahoo");

// Remover elementos da lista
list.Remove("Yahoo");

// Acessar os elementos da lista
Console.WriteLine(list[0]); // Imprime Bing
Console.WriteLine(list[1]); // Imprime Google
Console.WriteLine(list[2]); // Imprime uma exceção, pois o índice é inválido
```

Para percorrer todos os elementos de uma lista, podemos usar um laço for ou um laço foreach, da mesma forma que para um array:

```csharp
// Usando um laço for
for (int i = 0; i < list.Count; i++)
{
    Console.WriteLine(list[i]); // Imprime cada elemento da lista
}

// Usando um laço foreach
foreach (string element in list)
{
    Console.WriteLine(element); // Imprime cada elemento da lista
}
```

## Listas Ligadas

Uma lista ligada é uma coleção de elementos que são armazenados em nós, que possuem uma referência para o próximo nó da lista. Uma lista ligada permite inserir e remover elementos em qualquer posição da lista, sem precisar mover os outros elementos. Para criar uma lista ligada em C#, usamos a classe `LinkedList<T>`, onde `T` é o tipo dos elementos da lista. Por exemplo:

```csharp
// Criar uma lista ligada de inteiros
LinkedList<int> linkedList = new LinkedList<int>();

// Adicionar elementos à lista ligada
linkedList.AddFirst(1); // Adiciona o elemento 1 no início da lista
linkedList.AddLast(2); // Adiciona o elemento 2 no final da lista
linkedList.AddAfter(linkedList.First, 3); // Adiciona o elemento 3 após o primeiro elemento da lista

// Remover elementos da lista ligada
linkedList.RemoveLast(); // Remove o último elemento da lista

// Acessar os elementos da lista ligada
Console.WriteLine(linkedList.First.Value); // Imprime 1
Console.WriteLine(linkedList.Last.Value); // Imprime 3
Console.WriteLine(linkedList.First.Next.Value); // Imprime 3
```

Para percorrer todos os elementos de uma lista ligada, podemos usar um laço foreach ou um laço while:

```csharp
// Usando um laço foreach
foreach (int element in linkedList)
{
    Console.WriteLine(element); // Imprime cada elemento da lista ligada
}

// Usando um laço while
LinkedListNode<int> node = linkedList.First; // Começa pelo primeiro nó da lista
while (node != null)
{
    Console.WriteLine(node.Value); // Imprime o valor do nó atual
    node = node.Next; // Avança para o próximo nó da lista
}
```

## Hashsets

Um hashset é uma coleção de elementos que não permite elementos duplicados, e que usa uma função de hash para armazenar e recuperar os elementos de forma eficiente. Para criar um hashset em C#, usamos a classe `HashSet<T>`, onde `T` é o tipo dos elementos do hashset. Por exemplo:

```csharp
// Criar um hashset de strings
HashSet<string> hashset = new HashSet<string>();

// Adicionar elementos ao hashset
hashset.Add("Bing"); // Retorna true, pois o elemento não estava no hashset
hashset.Add("Google"); // Retorna true, pois o elemento não estava no hashset
hashset.Add("Bing"); // Retorna false, pois o elemento já estava no hashset

// Remover elementos do hashset
hashset.Remove("Google"); // Retorna true, pois o elemento estava no hashset

// Verificar se um elemento está no hashset
Console.WriteLine(hashset.Contains("Bing")); // Imprime true
Console.WriteLine(hashset.Contains("Yahoo")); // Imprime false
```

Para percorrer todos os elementos de um hashset, podemos usar um laço foreach:

```csharp
// Usando um laço foreach
foreach (string element in hashset)
{
    Console.WriteLine(element); // Imprime cada elemento do hashset
}
```

## Quicksort

Quicksort é um algoritmo de ordenação que usa a estratégia de dividir e conquistar. Ele escolhe um elemento como pivô, e particiona o array em dois subarrays, um com os elementos menores ou iguais ao pivô, e outro com os elementos maiores que o pivô. Em seguida, ele aplica o mesmo processo recursivamente aos subarrays, até que o array esteja ordenado. Para implementar o quicksort em C#, podemos usar o seguinte código:

```csharp
// Método que ordena um array usando o quicksort
public static void Quicksort(int[] array, int low, int high)
{
    if (low < high)
    {
        // Encontra o índice do pivô após a partição
        int pivot = Partition(array, low, high);

        // Ordena os subarrays à esquerda e à direita do pivô
        Quicksort(array, low, pivot - 1);
        Quicksort(array, pivot + 1, high);
    }
}

// Método que particiona o array em torno de um pivô
public static int Partition(int[] array, int low, int high)
{
    // Escolhe o último elemento como pivô
    int pivot = array[high];

    // Inicializa o índice do menor elemento
    int i = low - 1;

    // Percorre os elementos do array, exceto o pivô
    for (int j = low; j < high; j++)
    {
        // Se o elemento atual é menor ou igual ao pivô
        if (array[j] <= pivot)
        {
            // Incrementa o índice do menor elemento
            i++;

            // Troca o elemento atual com o elemento no índice do menor elemento
            int temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    // Troca o pivô com o elemento no índice do menor elemento + 1
    int temp2 = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp2;

    // Retorna o índice do pivô
    return i + 1;
}
```

Para testar o algoritmo, podemos usar o seguinte código:

```csharp
// Criar um array de inteiros desordenados
int[] array = new int[] { 5, 3, 7, 2, 9, 1, 4, 6, 8 };

// Ordenar o array usando o quicksort
Quicksort(array, 0, array.Length - 1);

// Imprimir o array ordenado
foreach (int element in array)
{
    Console.WriteLine(element); // Imprime 1, 2, 3, 4, 5, 6, 7, 8, 9
}
```

## Tabela Hash

Uma tabela hash é uma estrutura de dados que associa chaves a valores, usando uma função de hash para calcular o índice de cada chave no array interno da tabela. Uma tabela hash permite inserir, remover e buscar pares


Ok, vamos continuar com o exemplo de tabela hash em C#. Uma tabela hash é uma estrutura de dados que associa chaves a valores, usando uma função de hash para calcular o índice de cada chave no array interno da tabela. Uma tabela hash permite inserir, remover e buscar pares chave-valor de forma rápida e eficiente.

## Fila

Uma fila é uma coleção de elementos que segue o princípio FIFO (first-in, first-out), ou seja, o primeiro elemento a entrar na fila é o primeiro a sair. Para criar uma fila em C#, usamos a classe `Queue<T>`, onde `T` é o tipo dos elementos da fila. Por exemplo:

```csharp
// Criar uma fila de strings
Queue<string> queue = new Queue<string>();

// Adicionar elementos à fila
queue.Enqueue("Bing"); // Adiciona o elemento "Bing" no final da fila
queue.Enqueue("Google"); // Adiciona o elemento "Google" no final da fila
queue.Enqueue("Yahoo"); // Adiciona o elemento "Yahoo" no final da fila

// Remover elementos da fila
string first = queue.Dequeue(); // Remove e retorna o primeiro elemento da fila, ou seja, "Bing"
string second = queue.Dequeue(); // Remove e retorna o segundo elemento da fila, ou seja, "Google"

// Verificar o próximo elemento da fila sem remover
string next = queue.Peek(); // Retorna o próximo elemento da fila, ou seja, "Yahoo"

// Verificar se um elemento está na fila
bool contains = queue.Contains("Bing"); // Retorna false, pois o elemento "Bing" já foi removido da fila
```

Para percorrer todos os elementos de uma fila, podemos usar um laço foreach:

```csharp
// Usando um laço foreach
foreach (string element in queue)
{
    Console.WriteLine(element); // Imprime cada elemento da fila
}
```

## Pilha

Uma pilha é uma coleção de elementos que segue o princípio LIFO (last-in, first-out), ou seja, o último elemento a entrar na pilha é o primeiro a sair. Para criar uma pilha em C#, usamos a classe `Stack<T>`, onde `T` é o tipo dos elementos da pilha. Por exemplo:

```csharp
// Criar uma pilha de inteiros
Stack<int> stack = new Stack<int>();

// Adicionar elementos à pilha
stack.Push(1); // Adiciona o elemento 1 no topo da pilha
stack.Push(2); // Adiciona o elemento 2 no topo da pilha
stack.Push(3); // Adiciona o elemento 3 no topo da pilha

// Remover elementos da pilha
int top = stack.Pop(); // Remove e retorna o elemento do topo da pilha, ou seja, 3
int second = stack.Pop(); // Remove e retorna o segundo elemento da pilha, ou seja, 2

// Verificar o próximo elemento da pilha sem remover
int next = stack.Peek(); // Retorna o próximo elemento da pilha, ou seja, 1

// Verificar se um elemento está na pilha
bool contains = stack.Contains(3); // Retorna false, pois o elemento 3 já foi removido da pilha
```

Para percorrer todos os elementos de uma pilha, podemos usar um laço foreach:

```csharp
// Usando um laço foreach
foreach (int element in stack)
{
    Console.WriteLine(element); // Imprime cada elemento da pilha
}
```

## Árvore

Uma árvore é uma estrutura de dados hierárquica que consiste em um nó raiz e vários nós filhos, que por sua vez podem ter seus próprios nós filhos. Cada nó pode armazenar um valor e uma referência para seus nós filhos. Uma árvore binária é um tipo especial de árvore em que cada nó pode ter no máximo dois filhos, chamados de filho esquerdo e filho direito. Para criar uma árvore binária em C#, podemos usar uma classe personalizada que representa um nó da árvore. Por exemplo:

```csharp
// Classe que representa um nó de uma árvore binária
class TreeNode
{
    // Valor do nó
    public int Value { get; set; }

    // Referência para o filho esquerdo do nó
    public TreeNode Left { get; set; }

    // Referência para o filho direito do nó
    public TreeNode Right { get; set; }

    // Construtor que recebe o valor do nó
    public TreeNode(int value)
    {
        Value = value;
        Left = null;
        Right = null;
    }
}
```

Para criar uma árvore binária, podemos instanciar objetos da classe TreeNode e atribuir as referências dos filhos. Por exemplo:

```csharp
// Criar uma árvore binária com os valores 1, 2, 3, 4, 5, 6, 7
// A estrutura da árvore é a seguinte:
//       1
//      / \
//     2   3
//    / \ / \
//   4  5 6  7

// Criar o nó raiz com o valor 1
TreeNode root = new TreeNode(1);

// Criar os nós filhos do nó raiz com os valores 2 e 3
root.Left = new TreeNode(2);
root.Right = new TreeNode(3);

// Criar os nós filhos do nó esquerdo do nó raiz com os valores 4 e 5
root.Left.Left = new TreeNode(4);
root.Left.Right = new TreeNode(5);

// Criar os nós filhos do nó direito do nó raiz com os valores 6 e 7
root.Right.Left = new TreeNode(6);
root.Right.Right = new TreeNode(7);
```

Para percorrer todos os elementos de uma árvore binária, podemos usar diferentes métodos de travessia, como pré-ordem, em-ordem e pós-ordem. Esses métodos usam a recursão para visitar os nós da árvore em uma determinada ordem. Por exemplo:

```csharp
// Método que percorre uma árvore binária em pré-ordem
// A ordem de visita é: raiz, esquerda, direita
public static void PreOrder(TreeNode node)
{
    // Se o nó é nulo, retorna
    if (node == null)
    {
        return;
    }

    // Imprime o valor do nó
    Console.WriteLine(node.Value);

    // Percorre o filho esquerdo do nó
    PreOrder(node.Left);

    // Percorre o filho direito do nó
    PreOrder(node.Right);
}

// Método que percorre uma árvore binária em ordem
// A ordem de visita é: esquerda, raiz, direita
public static void InOrder(TreeNode node)
{
    // Se o nó é nulo, retorna
    if (node == null)
    {
        return;
    }

    // Percorre o filho esquerdo do nó
    InOrder(node.Left);

    // Imprime o valor do nó
    Console.WriteLine(node.Value);

    // Percorre o filho direito do nó
    InOrder(node.Right);
}

// Método que percorre uma árvore binária em pós-ordem
// A ordem de visita é: esquerda, direita, raiz
public static void PostOrder(TreeNode node)
{
    // Se o nó é nulo, retorna
    if (node == null)
    {
        return;
    }

    // Percorre o filho esquerdo do nó
    PostOrder(node.Left);

    // Percorre o filho direito do nó
    PostOrder(node.Right);

    // Imprime o valor do nó
    Console.WriteLine(node.Value);
}
```

Para testar os métodos de travessia, podemos usar o seguinte código:

```csharp
// Criar uma árvore binária com os valores 1, 2, 3, 4, 5, 6, 7
// A estrutura da árvore é a seguinte:
//       1
//      / \
//     2   3
//    / \ / \
//   4  5 6  7

// Criar o nó raiz com o valor 1
TreeNode root = new TreeNode(1);

// Criar os nós filhos do nó raiz com os valores 2 e 3
root.Left = new TreeNode(2);
root.Right = new TreeNode(3);

// Criar os nós filhos do nó esquerdo do nó raiz com os valores 4 e 5
root.Left.Left = new TreeNode(4);
root.Left.Right = new TreeNode(5);

// Criar os nós filhos do nó direito do nó raiz com os valores 6 e 7
root.Right.Left = new TreeNode(6);
root.Right.Right = new TreeNode(7);

// Percorrer a árvore em pré-ordem
Console.WriteLine("Pre-order traversal:");
PreOrder(root);

// Percorrer a árvore em ordem
Console.WriteLine("In-order traversal:");
InOrder(root);




Origem: conversa com o Bing, 22/12/2023
(1) Setting a Markdown processor for your GitHub Pages site using Jekyll. https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/setting-a-markdown-processor-for-your-github-pages-site-using-jekyll.
(2) GitHub Pages | Jekyll • Simple, blog-aware, static sites. https://jekyllrb.com/docs/github-pages/.