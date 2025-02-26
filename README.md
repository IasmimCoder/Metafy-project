<<<<<<< HEAD
#Metafy

Aplicação pessoal de gestão financeira, projetada para oferecer uma plataforma prática que auxilia usuários no acompanhamento detalhado de suas finanças, com foco em organização e controle.

O projeto de desenvolvimento de uma aplicação pessoal de gestão financeira, que busca oferecer uma plataforma prática e segura para que usuários acompanhem suas finanças, com foco em organização e controle. 

A aplicação oferece funcionalidades essenciais, como o gerenciamento de receitas e despesas, onde os usuários podem cadastrar diferentes fontes de receita (salários, investimentos, etc.) e tipos de despesas (contas, lazer, etc.), com a opção de adicionar data, categoria, valor e observações a cada transação. Além disso, é possível editar ou excluir registros, promovendo uma experiência flexível e adaptável às necessidades financeiras de cada usuário. Os dados de receitas e despesas são armazenados na tabela Transações, que organiza as informações por colunas como id, usuario_id, tipo (receita ou despesa), valor, data, categoria_id, e observacoes.

Para planejamento financeiro, a aplicação permite que usuários definam metas financeiras, como poupar para viagens, compras ou fundos de emergência. As metas são criadas com título, descrição, valor-alvo e prazo, e o progresso é monitorado em relação ao valor economizado. Essas informações são organizadas na tabela Metas, com colunas como id, usuario_id, titulo, descricao, valor_meta, valor_acumulado e prazo.
Outra funcionalidade central é a geração de relatórios e gráficos, que possibilita a visualização de relatórios mensais, gráficos de distribuição de despesas por categoria e acompanhamento do progresso das metas. Esses relatórios podem ser exportados em formatos como PDF ou CSV para maior flexibilidade e análise externa, armazenados na tabela Relatórios, contendo id, usuario_id, data_inicio, data_fim e tipo (mensal, anual).
A aplicação também conta com notificações e alertas automáticos, informando os usuários sobre o vencimento de metas, gastos excessivos e novas transações. As preferências de notificação são personalizáveis, permitindo que o usuário configure alertas específicos. As notificações são registradas na tabela Notificações, com colunas id, usuario_id, tipo_notificacao, conteudo, e status (pendente ou lido).
O dashboard interativo exibe um resumo financeiro acessível e intuitivo, apresentando widgets com informações de receitas e despesas recentes, categorias de maior gasto e progresso nas metas. Ele consome dados de Transações, Metas, e Relatórios sem necessidade de novas tabelas, centralizando o acompanhamento financeiro de maneira visual e simplificada.
Por fim, a aplicação implementa cadastro e autenticação de usuários, permitindo que cada usuário gerencie seu perfil e seus dados pessoais, como email e senha. Esses dados são armazenados na tabela Usuários, com colunas como id, nome, email, senha e data_criacao.
A aplicação destina-se a indivíduos que buscam um controle financeiro mais organizado e eficiente, oferecendo uma visão clara e abrangente dos hábitos financeiros, facilitando a tomada de decisões e contribuindo para um maior equilíbrio e autonomia financeira.
=======
# Metafy

**Metafy** é uma aplicação pessoal de gestão financeira, projetada para oferecer uma plataforma prática e segura que auxilia usuários no acompanhamento detalhado de suas finanças, com foco em organização e controle.

## Sobre o Projeto

Metafy tem como objetivo proporcionar uma visão clara e organizada das finanças pessoais, ajudando os usuários a registrar, planejar e monitorar suas receitas, despesas e metas financeiras. Com funcionalidades práticas e uma interface intuitiva, Metafy oferece recursos essenciais para o controle financeiro de forma personalizada, auxiliando os usuários na tomada de decisões financeiras mais informadas e conscientes.

## Funcionalidades

### 1. Gerenciamento de Receitas e Despesas
   - Cadastro de diferentes fontes de receita (salários, investimentos, etc.) e tipos de despesas (contas, lazer, etc.).
   - Possibilidade de adicionar data, categoria, valor e observações a cada transação.
   - Funções de edição e exclusão para cada registro, promovendo uma experiência flexível e adaptável.
   - **Tabela Transações**: Organiza as informações por colunas como `id`, `usuario_id`, `tipo` (receita ou despesa), `valor`, `data`, `categoria_id`, e `observacoes`.

### 2. Planejamento e Metas Financeiras
   - Permite que usuários definam metas financeiras, como poupar para viagens, compras ou fundos de emergência.
   - Metas são criadas com título, descrição, valor-alvo e prazo, e o progresso é monitorado em relação ao valor economizado.
   - **Tabela Metas**: Organiza as metas em colunas como `id`, `usuario_id`, `titulo`, `descricao`, `valor_meta`, `valor_acumulado` e `prazo`.

### 3. Relatórios e Visualizações Gráficas
   - Geração de relatórios mensais e gráficos de distribuição de despesas por categoria.
   - Acompanhamento do progresso das metas.
   - Exportação de relatórios em formatos como PDF ou CSV.
   - **Tabela Relatórios**: Armazena relatórios com colunas como `id`, `usuario_id`, `data_inicio`, `data_fim` e `tipo` (mensal, anual).

### 4. Notificações e Alertas
   - Notificações automáticas sobre o vencimento de metas, gastos excessivos e novas transações.
   - Preferências de notificação personalizáveis, permitindo que o usuário configure alertas específicos.
   - **Tabela Notificações**: Armazena notificações com colunas como `id`, `usuario_id`, `tipo_notificacao`, `conteudo` e `status` (pendente ou lido).

### 5. Dashboard Interativo
   - Exibe um resumo financeiro com widgets para receitas e despesas recentes, categorias de maior gasto e progresso nas metas.
   - Consome dados de `Transações`, `Metas`, e `Relatórios`, centralizando o acompanhamento financeiro de maneira visual e simplificada.

### 6. Cadastro e Autenticação de Usuário
   - Gerenciamento de usuários para controle de acesso e gerenciamento de perfis pessoais, como email e senha.
   - **Tabela Usuários**: Armazena informações dos usuários com colunas como `id`, `nome`, `email`, `senha` e `data_criacao`.

## Público-Alvo

Metafy é destinado a indivíduos que buscam um controle financeiro mais organizado e eficiente, oferecendo uma visão clara e abrangente dos hábitos financeiros, facilitando a tomada de decisões e contribuindo para um maior equilíbrio e autonomia financeira.

## Tecnologias Utilizadas

- **Linguagem**: [Java]
- **Framework**: [Spring Boot]
- **Banco de Dados**: [PostgreSQL]
- **Front-end**: [HTML/CSS, JavaScript] (ou outras conforme o desenvolvimento)
- **Integrações**: Exportação de relatórios (PDF/CSV)

---

**Nota**: Este projeto está em desenvolvimento e novas funcionalidades podem ser adicionadas ao longo do tempo para aprimorar a experiência do usuário.

>>>>>>> b9948597553e3035949ee45036c73bd8bd79b7c7
