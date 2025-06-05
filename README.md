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
