-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17/11/2024 às 22:45
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `tcc_db`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `ia_id` int(11) NOT NULL,
  `ultimo_acesso` datetime DEFAULT current_timestamp(),
  `contexto` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`contexto`)),
  `historico` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`historico`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `inteligenciasartificiais`
--

CREATE TABLE `inteligenciasartificiais` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `data_criacao` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `data_criacao` datetime DEFAULT current_timestamp(),
  `ultimo_acesso` datetime DEFAULT NULL,
  `foto` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `data_criacao`, `ultimo_acesso`, `foto`) VALUES
(1, 'Admin', 'Yuridonwload444@gmail.com', 'Admin123123', '2024-10-30 15:17:35', '2024-11-17 18:43:09', NULL),
(16, 'JoaoTeste654', 'admiqdfasd@dfsadawdawd', 'dfgklsdjkgklsdjkpfgh', '2024-11-07 17:17:38', NULL, NULL),
(19, 'JoaoTeste500', 'admiqdfasd@dfsad', 'dfgklsdjkgklsdjkpfgh', '2024-11-07 17:22:09', NULL, NULL),
(20, 'JoaoTeste123123', 'TUTOTO@AFRICA', 'awdawdawdadawdad', '2024-11-07 17:26:13', NULL, NULL),
(22, 'JoaoTeste123', 'TUTOTO@AFRICA2', 'awdawdawdadawdad', '2024-11-07 17:28:04', NULL, NULL),
(24, 'JoaoTeste1233456346', 'TUTOTO@AFRICA2123', 'awdawdawdadawdad', '2024-11-07 17:30:09', NULL, NULL),
(26, 'JoaoTeste12334563461', 'TUTOTO@AFRICA2123123123', 'awdawdawdadawdad', '2024-11-07 17:32:48', NULL, NULL),
(46, 'yuri202122', 'yuri-souza9@educar.rs.gov.br', 'yuri260107', '2024-11-08 21:53:57', NULL, NULL),
(47, 'asdawdawda', 'wdsawdawd@asdawdawd', 'admin123123', '2024-11-08 21:58:53', NULL, NULL),
(51, 'dflkjgndklfgnd', 'zuidhnfuijsaedni@dnsfgijusndijuns', 'dgfhjfgjkfgh', '2024-11-08 22:00:41', NULL, NULL),
(53, '23423452534235352', 'admin123123123231@sdfgdfgdfghf', 'admin123123dfghfghdf', '2024-11-08 22:03:53', NULL, NULL),
(54, 'ingrid223355', 'ingrid3453@gmAIL.COM', '1234567890', '2024-11-11 02:04:03', NULL, NULL),
(55, 'Diogo123123', 'Diogodonelese@gmai.com', 'Diogo123123', '2024-11-15 17:54:00', NULL, NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `ia_id` (`ia_id`);

--
-- Índices de tabela `inteligenciasartificiais`
--
ALTER TABLE `inteligenciasartificiais`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `inteligenciasartificiais`
--
ALTER TABLE `inteligenciasartificiais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`ia_id`) REFERENCES `inteligenciasartificiais` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
