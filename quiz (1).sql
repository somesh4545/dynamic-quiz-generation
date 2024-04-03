-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2023 at 06:07 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz`
--

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `topics` varchar(255) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `total_responses` int(11) NOT NULL,
  `avg_score` float NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`id`, `name`, `topics`, `teacher_id`, `total_responses`, `avg_score`, `date`) VALUES
(1, 'html', 'html', 1, 0, 0, '2023-12-14 14:08:55'),
(2, 'html 1', 'html', 1, 0, 0, '2023-12-14 14:10:59'),
(3, 'html 3', 'html, css', 1, 0, 0, '2023-12-14 14:14:51'),
(4, 'java', 'java socket', 1, 0, 0, '2023-12-14 14:16:58'),
(5, 'HTML 12', 'HTML 5, bootstrap', 1, 0, 0, '2023-12-14 15:56:48'),
(6, 'new quiz', 'java', 1, 0, 0, '2023-12-14 15:59:49'),
(7, 'java', 'java', 1, 1, 0, '2023-12-14 16:00:03'),
(8, 'new quiz', 'html', 3, 1, 0, '2023-12-14 16:21:19'),
(9, 'Java sockets', 'java socket', 3, 1, 0, '2023-12-14 16:53:30');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `options` varchar(255) NOT NULL,
  `right_answer` varchar(255) NOT NULL,
  `quiz_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz_questions`
--

INSERT INTO `quiz_questions` (`id`, `question`, `options`, `right_answer`, `quiz_id`) VALUES
(1, 'Which of the following is used to define a hyperlink in HTML?', '[\"1. <a>\",\"2. <h1>\",\"3. <p>\",\"4. <img>\"]', '1. <a>', 3),
(2, 'Which CSS property can be used to define the font size of a text?', '[\"1. font-style\",\"2. font-family\",\"3. font-size\",\"4. font-weight\"]', '3. font-size', 3),
(3, 'What is a socket in Java?', '[\"A network connection\",\"A type of data structure\",\"A programming language\",\"A type of socket wrench\"]', 'A network connection', 4),
(4, 'Which method in Java is used to establish a socket connection?', '[\"connect()\",\"listen()\",\"open()\",\"create()\"]', 'connect()', 4),
(5, 'What does HTML stand for?', '[\"Hyper Text Markup Language\",\"Hyper Tool Markup Language\",\"Hyperlinks and Text Markup Language\",\"Highly Text Markup Language\"]', 'Hyper Text Markup Language', 5),
(6, 'What is the latest version of HTML?', '[\"HTML 4\",\"HTML 6\",\"HTML 5\",\"HTML 3\"]', 'HTML 5', 5),
(7, 'Which of the following is NOT a valid HTML element?', '[\"div\",\"section\",\"tab\",\"aside\"]', 'tab', 5),
(8, 'Which library is used for developing responsive web design?', '[\"jQuery\",\"Bootstrap\",\"Angular\",\"React\"]', 'Bootstrap', 5),
(9, 'What is Java?', '[\"A type of coffee\",\"A programming language\",\"A country in Southeast Asia\",\"A type of fruit\"]', 'A programming language', 6),
(10, 'Which data type is used to store a single character in Java?', '[\"char\",\"String\",\"boolean\",\"int\"]', 'char', 7),
(11, 'What does HTML stand for?', '[\"Hyper Text Markup Language\",\"Hyper Tech Markup Language\",\"Hyper Text Markup Linguistics\",\"Home Tool Markup Language\"]', 'Hyper Text Markup Language', 8),
(12, 'What is the purpose of a Java socket?', '[\"To establish a network connection\",\"To store data for future use\",\"To run multiple threads simultaneously\",\"To execute remote method calls\"]', 'To establish a network connection', 9),
(13, 'Which of the following is true about Java sockets?', '[\"They are only used for client-server communication\",\"They can only be used for local network communication\",\"They allow for communication between two processes on different machines\",\"They can only be used for TCP connections\"]', 'They allow for communication between two processes on different machines', 9);

-- --------------------------------------------------------

--
-- Table structure for table `responses`
--

CREATE TABLE `responses` (
  `id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `student_name` varchar(255) NOT NULL,
  `score` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `responses`
--

INSERT INTO `responses` (`id`, `quiz_id`, `student_name`, `score`, `date`) VALUES
(1, 5, 'somesh', 3, '2023-12-14 16:42:41'),
(2, 6, 'somesh', 1, '2023-12-14 16:43:30'),
(3, 7, 'somesh', 1, '2023-12-14 16:44:53'),
(4, 8, 'somesh', 1, '2023-12-14 16:46:31'),
(5, 7, 'somesh', 1, '2023-12-14 16:50:00'),
(6, 8, 'somesh', 1, '2023-12-14 16:50:38'),
(7, 9, 'prathamesh', 2, '2023-12-14 16:54:04');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `email`, `password`) VALUES
(1, 'somesh@gmail.com', 'somesh'),
(2, 'someshsomani@gmail.com', 'somesh'),
(3, 'someshsomani457@gmail.com', 'somesh');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `responses`
--
ALTER TABLE `responses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `responses`
--
ALTER TABLE `responses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
