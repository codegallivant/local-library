-- Adminer 4.8.1 MySQL 8.0.22 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `BookName` varchar(100) NOT NULL,
  `Issued` int NOT NULL DEFAULT '0',
  `TotalQuantity` int NOT NULL DEFAULT '1',
  `QuantityLeft` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `Book Name` (`BookName`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `borrowers`;
CREATE TABLE `borrowers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `book_id` int NOT NULL,
  `borrowing_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_id` (`member_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `borrowers_ibfk_10` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `borrowers_ibfk_8` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8;


DELIMITER ;;

CREATE TRIGGER `IssueCheckUpdate` BEFORE INSERT ON `borrowers` FOR EACH ROW
BEGIN
DECLARE booksLeft INT;
DECLARE booksIssued INT;
       
SELECT QuantityLeft INTO booksLeft FROM books WHERE id = new.book_id;
SELECT Issued INTO booksIssued FROM books WHERE id=new.book_id;
 if (booksLeft=0) THEN
    signal sqlstate '45000';
elseif (booksLeft>0) then 
 UPDATE `books` SET books.QuantityLeft=(booksLeft-1) WHERE books.id = NEW.book_id;
UPDATE `books` SET books.Issued=(booksIssued+1) WHERE books.id =  NEW.book_id;
 END IF;
end;;

CREATE TRIGGER `DateSetup` BEFORE INSERT ON `borrowers` FOR EACH ROW
SET NEW.borrowing_date = IFNULL(NEW.borrowing_date,NOW());;

CREATE TRIGGER `deleteCheck` BEFORE DELETE ON `borrowers` FOR EACH ROW
BEGIN
DECLARE booksLeft INT;
DECLARE booksIssued INT;
       
 SELECT QuantityLeft INTO booksLeft FROM books WHERE id = old.book_id;
SELECT Issued INTO booksIssued FROM books WHERE id=old.book_id;
update books set Issued=(booksIssued-1) WHERE id=old.book_id;
update books set QuantityLeft=(booksLeft+1) where id=old.book_id;
END;;

DELIMITER ;

DROP TABLE IF EXISTS `librarians`;
CREATE TABLE `librarians` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `email` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`(20))
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

INSERT INTO `librarians` (`id`, `username`, `password`, `email`) VALUES
(14,	'admin',	'pbkdf2$10000$b1150698988bea66690fef7bdad7d7fb195b34bc1ab6c04d2488e39cb7e0789560bd9dff2ba3145b484b3c3bb6c7d270e4defa93f7339aff10fcb1ee13f1d6374f2cad920a74b12c4a9f973b09ad1d4f818aedd9d174e538e32ec3263e5ca551f54691fddec6bdbcd4171f8b05f3ace9ac0ee17ef9c313761fa1074e2b3bc93d$ac7bdb65e203d16a9ed1e56c2723191b3c79dac404912a0921c7de11b75658e19ccae9dcd794052bdda4c99ea072d242b8dd6a856204088d268d784b0aa1b7bace39bb51d82dd8ce73bbb5fbf6700377ef1be2faea2e22f0b084dbbd028c6c71f18ba4a1d2de4570bde08570fb3656559d937e516c6ec97a6aff8cd98505da50a1a9ae0c8870026b060767a734b8b314f547e47384bc509979bdf17e4c662099fa821f27bf029692403be2b92aeb09402955ca0cf7f26ac8176749634139501ed53a58d0da1b07c2e7a77c6564d81d10288f17987abec7501df05a12c13acc8d5713df6a766c662d525692a969885b6dab85143d506a9c5559f4d3c17c3e000fab5e6605e891ff5f4b1f0474ef003c46e47f7f3846afa84d5d102940146c775547846ef14c6374608a1d167c54f34e16cd3e64aca3daa194e63a402f57cb0db68210ce6784747a39370e8b69b9f4d8890bdd2b2d6167a582a7dc1ef439b45c2a57c6b75855315738e6ca7419a71648c3e59349b9da6c0aa24b397f8edc9cd254c6027e97768dff6525eacad783a0e459e8e9a6f100b1e05d8f4f917f5223227247d706dc02f2ce713d54be2c87e8e0431cfbda9555c2f4d585961e1a9161b66bd7d359579f3f7dcb6437fa6d9aa8926d40d77c5916a8d66245aff00a2b0f30001e878c4bfe516154e65f090370ae336a38dbda1c5710800108eec9ab8785c63b',	'testaddress@testhost.com');

DROP TABLE IF EXISTS `members`;
CREATE TABLE `members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_name` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;


-- 2021-09-23 22:48:30