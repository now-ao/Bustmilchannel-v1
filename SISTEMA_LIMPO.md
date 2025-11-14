# Sistema ERP - Dados Limpos para Testes

## ✅ Status Atual

O sistema foi configurado sem dados pré-cadastrados de:
- ❌ Produtos (vazio)
- ❌ Clientes (vazio)
- ❌ Vendas (vazio)
- ❌ Caixas (vazio)
- ❌ Contas a Receber/Pagar (vazio)

Apenas os **usuários** são mantidos para permitir login no sistema.

## 🔐 Credenciais de Acesso

### Administrador
- **Email:** admin@erp.com
- **Senha:** admin123
- **Permissões:** Acesso completo ao sistema

### Caixistas
- **Email:** joao@erp.com
- **Senha:** caixa123
- **Permissões:** Vendas, Clientes, Faturas, Caixa

- **Email:** maria@erp.com
- **Senha:** caixa123
- **Permissões:** Vendas, Clientes, Faturas, Caixa

## 📋 Módulos Implementados

### ✅ Funcionais e Limpos
1. **GERA PEDIDO DE VENDAS** (/) - Sistema de vendas com carrinho e scanner de código de barras
2. **ESTOQUE PRODUTO ACABADO** (/produtos) - Gestão de produtos e estoque
3. **CLIENTE** (/clientes) - CRM e gestão de clientes
4. **GERA NOTA FISCAL DE VENDA** (/faturas) - Histórico de vendas e faturas
5. **GERA CONTAS A RECEBER** (integrado) - Sistema de contas a receber
6. **MOVIMENTO DE TÍTULOS A RECEBER** (integrado) - Fluxo de títulos
7. **GESTÃO DE CAIXA** (/caixa) - Abertura/fechamento de caixa
8. **FLUXO DE CAIXA** (/fluxo-caixa) - Dashboard consolidado de fluxo de caixa
9. **RELATÓRIOS** (/relatorios) - Relatórios e análises

## 🧪 Como Testar o Sistema

### 1. Cadastrar Produtos
1. Faça login como admin (admin@erp.com / admin123)
2. Acesse "Produtos" no menu lateral
3. Clique em "Novo" para adicionar produtos
4. Preencha os campos necessários:
   - Código
   - Nome
   - Categoria
   - Unidade
   - Preço de Custo
   - Preço de Venda
   - Estoque Inicial
   - Código de Barras (opcional)

### 2. Cadastrar Clientes
1. Acesse "Clientes" no menu
2. Clique em "Novo Cliente"
3. Preencha os dados do cliente:
   - Nome
   - Documento (CPF/CNPJ)
   - Email
   - Telefone
   - Endereço completo

### 3. Realizar Vendas
1. Acesse "Vendas" (página inicial)
2. Busque produtos por nome ou use o scanner de código de barras
3. Adicione produtos ao carrinho
4. Ajuste quantidades conforme necessário
5. Selecione o método de pagamento
6. Finalize a venda

### 4. Abrir Caixa
1. Acesse "Caixa" no menu
2. Clique em "Abrir Caixa"
3. Informe o valor inicial do caixa
4. As vendas serão registradas neste caixa

### 5. Visualizar Fluxo de Caixa
1. Acesse "Fluxo de Caixa" (somente admin)
2. Visualize:
   - Total a receber
   - Total a pagar
   - Saldo projetado
   - Títulos vencidos

## 🧹 Limpar Dados do Sistema

Para limpar todos os dados e começar novamente:

1. Faça login como administrador
2. Acesse "Configurações" no menu
3. Role até a seção "Zona de Perigo"
4. Clique em "Limpar Todos os Dados"
5. Confirme a ação

**⚠️ Atenção:** Esta ação é irreversível e removerá todos os dados exceto os usuários.

## 🔄 Validação com Zod

Todos os formulários possuem validação robusta:
- Campos obrigatórios
- Formato de email
- Comprimento mínimo/máximo
- Valores numéricos válidos
- Prevenção de injeção de código

## 📊 Próximos Módulos a Implementar

1. **CONTAS A PAGAR** - Gestão de despesas e fornecedores
2. **FORNECEDOR** - Cadastro de fornecedores
3. **GERA PEDIDO DE COMPRAS** - Sistema de compras
4. **ORÇAMENTO FINANCEIRO** - Planejamento financeiro
5. **LANÇAMENTOS CONTÁBEIS** - Contabilidade
6. **CENTRO DE CUSTOS** - Análise de custos
7. **ESTOQUE MATÉRIA-PRIMA** - Gestão de matéria-prima

## 💾 Armazenamento

O sistema utiliza **IndexedDB** (banco de dados local do navegador):
- Todos os dados ficam salvos no navegador
- Não há sincronização entre dispositivos
- Para backup, use a funcionalidade de exportação (quando disponível)
- Para migrar para banco de dados real, ative o Lovable Cloud

## 🚀 Migração para Lovable Cloud

Para ter um backend real com sincronização entre dispositivos:
1. Ative o Lovable Cloud nas configurações
2. Os dados serão migrados automaticamente para PostgreSQL
3. Sistema de autenticação adequado será configurado
4. Sincronização multi-dispositivo será habilitada