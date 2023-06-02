# FisioVR
Este projeto visa pesquisar e desenvolver uma arquitetura baseada em visão computacional que possibilite a individualização do tratamento de reabilitação de pacientes à distância. A arquitetura proposta poderá ser utilizada em clínicas ou à domicílio, uma vez que será automatizada, fazendo uso de elementos gráficos que serão sobrepostos à imagem do paciente ao realizar exercícios. Espera-se com esse sistema gerar um ambiente de reabilitação seguro tanto para pacientes quanto para os profissionais de saúde envolvidos.

https://avrgroup.github.io/FisioVR/


## Instalação

Vamos começar instalando o banco de dados. 

1.  Instale o [MySql](https://dev.mysql.com/downloads/installer/) na versão 8. Se estiver usando o Ubuntu 22.04 você pode seguir esse [tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-22-04);

<b>(IMPORTANTE:Ao criar a senha para o root, utilize a senha "Teste" (sem as aspas)).</b>

2. Abra o terminal e faça o login no mysql como root:
    
        mysql -u root -p

3. Crie o banco de dados FISIOVR:

        CREATE DATABASE FISIOVR;

4. Saia do MySQL:

        exit
5. Baixe a [estrutura do banco](https://github.com/AVRGroup/FisioVR/blob/main/fisiovr.sql) e rode o seguinte comando se atentando para colocar o endereço certo para o arquivo .sql que você acabou de baixar:

        mysql -u root -p FISIOVR < /caminho/para/fisiovr.sql

Tudo ocorrendo corretamente o banco de dados já está pronto.

Agora você precisa instalar o [Node.js](https://nodejs.org/pt-br/download/package-manager/) (de preferência na versão 16).
Tendo instalado Node.js, abra o terminal na pasta do projeto e execute os seguintes comandos:

    cd back/
    npm install

Então, resta apenas iniciar o servidor:

    npm start

O servidor inicia em http://localhost:3000
