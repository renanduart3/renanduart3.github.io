---
title: Mermaid Diagram Test
description: Testing various Mermaid diagram types to ensure proper rendering and theme integration.
date: 2025-09-07
tags:
  - formatting
  - obsidian
draft: false
image:
imageAlt:
imageOG: false
hideCoverImage: false
hideTOC: false
targetKeyword:
aliases:
  - mermaid-test
---
This post tests the Mermaid diagram integration with various diagram types to ensure proper rendering and theme compatibility.

## Flowchart

```mermaid
graph TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    C --> D[Rethink]
    D --> B
    B ---->|No| E[End]
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    participant John
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```

## Class Diagram

```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +String color
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat
```

## State Diagram

```mermaid
stateDiagram-v2
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
```

## Entity Relationship Diagram

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```

## User Journey

```mermaid
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
```

## Gantt Chart

```mermaid
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2024-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2024-01-12  , 12d
    another task     : 24d
```

## Pie Chart

```mermaid
pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
```

## Git Graph

```mermaid
    gitGraph
       commit
	   commit
	   branch develop
	   checkout develop
	   commit
	   commit
	   checkout main
	   merge develop
	   commit
	   commit
```

## Complex Flowchart with Styling

```mermaid
graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
    D --> G[fa:fa-laptop fa:fa-code Laptop]
    E --> H[fa:fa-mobile iPhone]
    F --> I[fa:fa-car Car]
```

## Error Handling Test

This should show an error state:

```mermaid
graph TD
    A[Invalid syntax
    B --> C
    INVALID_COMMAND
```

## Theme Integration

The diagrams should automatically adapt to the current theme (light/dark) and use the theme colors for better integration with the overall design.

## Responsive Design

All diagrams should be responsive and work well on mobile devices, with proper scaling and overflow handling.
