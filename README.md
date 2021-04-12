# Projeto-de-Computacao

Sistema construído para a matéria de Sistemas de Computação do curso de Engenharia de Computação da Universidade Estadual de Ponta Grossa.

# Descrição

Um aparelho instalado em uma tubulação gera pulsos elétricos através do fluxo da água, proporcional a sua vazão. Um microcontrolador conta o número de pulsos por segundo e envia para 
um banco de dados não relacional. Um website mostra esses dados para o usuário.

Em virtude da pandemia do novo coronavirus, o sistema teve de ser simulado. Para isso o aparelho foi modelado através do software Fusion 360 e simulado no Copelia. A api do Copelia
envia conversa com um cliente em Python que envia os dados para o MongoDB. O Website recupera esses dados e os entrega ao usuário final.
