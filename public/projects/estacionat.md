---
title: EstacionaT - Sistema de Estacionamento
date: 2024-01-01
author: Renan Duarte
id: proj-7
tech:
  - C#
  - .NET
  - Docker
image: https://raw.githubusercontent.com/renanduart3/EstacionaT/master/ImagesOut/UseCaseNovo.png
---

# EstacionaT - Sistema de Estacionamento

Sistema de controle de estacionamento criado para resolver um problema real: a impossibilidade de validar tickets dentro do período de tolerância em alguns sistemas convencionais.

**O Problema:** Clientes que saem do estacionamento antes dos 15 minutos não conseguem validar o ticket antes do tempo mínimo de cobrança, forçando-os a esperar o prazo vencer — o que pode resultar em cobrança indevida ou correria na saída.

**A Solução:**
- Validação de ticket aceita a qualquer momento, independente do tempo de tolerância
- Se o tempo mínimo não foi atingido, o ticket é validado com garantia de janela de saída
- Sistema de detecção de congestionamento interno e externo para abolir a tolerância de saída em situações de tráfego
- API REST com arquitetura em camadas (Domain, Infrastructure, API)
- Testes automatizados incluídos

Demonstra como um fluxo de software pode e deve ser corrigido para eliminar situações injustas ao usuário final.
