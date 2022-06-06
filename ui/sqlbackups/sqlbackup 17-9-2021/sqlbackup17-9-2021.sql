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

INSERT INTO `books` (`id`, `BookName`, `Issued`, `TotalQuantity`, `QuantityLeft`) VALUES
(1,	'Harry Potter - 2: The Chamber of Secrets',	0,	1,	1),
(2,	'Harry Potter - 1: The Sorcerer\'s Stone',	0,	1,	1),
(3,	'Harry Potter - 3: The Prisoner of Azkaban',	2,	2,	0),
(4,	'Harry Potter - 4: The Goblet of Fire',	0,	5,	5),
(5,	'Harry Potter - 5: The Order of The Phoenix',	1,	3,	2),
(6,	'Percy Jackson And The Olympians -1',	0,	3,	3),
(7,	'Percy Jackson And The Olympians -2',	0,	3,	3),
(8,	'Percy Jackson And The Olympians -3',	0,	3,	3),
(9,	'Percy Jackson And The Olympians -4',	0,	3,	3),
(10,	'Percy Jackson And The Olympians -5',	1,	3,	2),
(11,	'Harry Potter - 6: The Half-Blood Prince',	1,	3,	2),
(12,	'Harry Potter - 7: The Deathly Hallows',	1,	3,	2),
(14,	'Harry Potter: The Cursed Child',	0,	3,	3),
(15,	'Journey To The Centre of The Earth',	0,	1,	1),
(16,	'Black Beauty',	0,	1,	1),
(17,	'Around The World In 80 Days',	0,	1,	1),
(18,	'Classroom of The Elite - Year 1 Volume 1',	0,	1,	1),
(19,	'Classroom of The Elite - Year 1 Volume 2',	0,	1,	1),
(20,	'Classroom of The Elite - Year 1 Volume 3',	0,	1,	1),
(21,	'Classroom of The Elite - Year 1 Volume 5',	0,	1,	1),
(22,	'Classroom of The Elite - Year 1 Volume 6',	0,	1,	1),
(23,	'Classroom of The Elite - Year 1 Volume 7',	1,	1,	0),
(24,	'Classroom of The Elite - Year 1 Volume 8',	0,	1,	1),
(25,	'Classroom of The Elite - Year 1 Volume 9',	0,	1,	1),
(26,	'Classroom of The Elite - Year 1 Volume 10',	0,	1,	1),
(27,	'Classroom of The Elite - Year 1 Volume 11',	0,	1,	1),
(28,	'Classroom of The Elite - Year 1 Volume 4.5',	0,	1,	1),
(29,	'Classroom of The Elite - Year 1 Volume 7.5',	0,	1,	1),
(30,	'Classroom of The Elite - Year 1 Volume 11.5',	0,	1,	1),
(31,	'Classroom of The Elite - Year 1 Volume 11.75',	0,	1,	1),
(32,	'Tower Of God - Volume 1',	0,	2,	2),
(33,	'The Heroes of Olympus - 1: The Lost Hero',	0,	1,	1),
(34,	'The Heroes of Olympus - 2: The Son Of Neptune',	0,	1,	1),
(35,	'The Heroes of Olympus - 3: The Mark of Athena',	0,	1,	1),
(36,	'The Heroes of Olympus - 5: The Blood of Olympus',	0,	1,	1),
(37,	'The Trials of Apollo - 1: The Hidden Oracle',	0,	1,	1),
(38,	'The Trials of Apollo - 2: The Dark Prophecy',	0,	1,	1),
(39,	'The Trials of Apollo - 3: The Burning Maze',	0,	1,	1),
(40,	'The Trials of Apollo - 4: The Tyrant\'s Tomb',	0,	1,	1),
(41,	'The Trials of Apollo - 5: The Tower of Nero',	0,	1,	1),
(42,	'The Kane Chronicles - 1: The Red Pyramid',	0,	1,	1),
(43,	'The Kane Chronicles - 2: The Throne of Fire',	0,	1,	1),
(44,	'The Kane Chronicles - 3: The Serpent\'s Shadow',	0,	1,	1),
(45,	'Robinson Crusoe',	0,	5,	5),
(46,	'The Empty Box and Zeroth Maria - Volume 1',	0,	1,	1),
(47,	'The Empty Box and Zeroth Maria - Volume 2',	0,	1,	1),
(48,	'The Empty Box and Zeroth Maria - Volume 3',	0,	1,	1),
(49,	'The Empty Box and Zeroth Maria - Volume 4',	0,	1,	1),
(50,	'The Empty Box and Zeroth Maria - Volume 5',	0,	1,	1),
(51,	'The Empty Box and Zeroth Maria - Volume 6',	0,	1,	1),
(52,	'The Empty Box and Zeroth Maria - Volume 7',	0,	1,	1),
(53,	'Annarasumanara',	0,	2,	2),
(54,	'The Horizon',	1,	3,	2),
(55,	'Tower of God - Volume 2',	0,	1,	1),
(56,	'Tower of God - Volume 3',	0,	1,	1),
(57,	'Tower of God - Volume 4',	0,	1,	1),
(58,	'Tower of God - Volume 5',	0,	1,	1),
(59,	'Tower of God - Volume 6',	0,	1,	1),
(60,	'Tower of God - Volume 7',	0,	1,	1),
(61,	'Tower of God - Volume 8',	0,	1,	1),
(62,	'Alex Rider - 1: Stormbreaker',	0,	1,	1),
(63,	'Magnus Chase and the Gods of Asgard - 1: The Sword of Summer',	0,	1,	1),
(64,	'Magnus Chase and the Gods of Asgard - 2: The Hammer of Thor',	0,	1,	1),
(65,	'Magnus Chase and the Gods of Asgard - 3: The Ship of the Dead',	0,	1,	1),
(66,	'The Heroes of Olympus - 4: The House of Hades',	0,	1,	1),
(67,	'The Maze Runner',	0,	1,	1),
(68,	'The Scorch Trials',	0,	1,	1),
(69,	'The Death Cure',	0,	1,	1),
(70,	'The Kill Order',	0,	1,	1),
(71,	'The Fever Code',	0,	1,	1),
(73,	'The Lord of the Rings - 1: The Fellowship of the Ring',	0,	1,	1),
(74,	'The Lord of the Rings - 2: The Two Towers',	0,	1,	1),
(75,	'The Lord of the Rings - 3: The Return of the King',	0,	1,	1),
(76,	'The Hobbit',	0,	1,	1),
(77,	'The Silmarillion',	0,	1,	1),
(79,	'The Diary of a Young Girl',	0,	6,	6),
(80,	'The Hunger Games',	0,	1,	1),
(81,	'Catching Fire',	0,	1,	1),
(82,	'Mockingjay',	0,	1,	1);

DROP TABLE IF EXISTS `borrowers`;
CREATE TABLE `borrowers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(6) NOT NULL,
  `book_id` int NOT NULL,
  `Fine_pending` int NOT NULL DEFAULT '0',
  `borrowing_date` datetime DEFAULT NULL,
  `returning_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_id` (`student_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `borrowers_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `borrowers_ibfk_4` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;

INSERT INTO `borrowers` (`id`, `student_id`, `book_id`, `Fine_pending`, `borrowing_date`, `returning_date`) VALUES
(16,	'7A23',	5,	1056,	'2018-10-20 13:05:11',	'2018-10-27 13:05:11'),
(32,	'7C29',	3,	894,	'2019-03-31 17:56:30',	'2019-04-07 17:56:30'),
(34,	'7A25',	3,	894,	'2019-03-31 18:02:44',	'2019-04-07 18:02:44'),
(54,	'9A29',	11,	0,	'2021-09-15 10:54:25',	'2021-09-22 10:54:25'),
(55,	'7A22',	12,	0,	'2021-09-15 11:18:34',	'2021-09-22 11:18:34'),
(56,	'7A24',	10,	0,	'2021-09-16 08:30:13',	'2021-09-23 08:30:13'),
(57,	'7A26',	54,	0,	'2021-09-17 10:58:45',	'2021-09-24 10:58:45'),
(59,	'9A22',	23,	0,	'2021-09-17 10:59:05',	'2021-09-24 10:59:05');

DELIMITER ;;

CREATE TRIGGER `DateSetup` BEFORE INSERT ON `borrowers` FOR EACH ROW
SET NEW.borrowing_date = IFNULL(NEW.borrowing_date,NOW()),
NEW.returning_date = TIMESTAMPADD(DAY,7,NEW.borrowing_date);;

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

DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Class` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Class` (`Class`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

INSERT INTO `classes` (`id`, `Class`) VALUES
(1,	1),
(2,	2),
(3,	3),
(4,	4),
(5,	5),
(6,	6),
(7,	7),
(8,	8),
(9,	9),
(10,	10),
(11,	11),
(12,	12);

DROP TABLE IF EXISTS `librarians`;
CREATE TABLE `librarians` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `email` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`(20))
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

INSERT INTO `librarians` (`id`, `username`, `password`, `email`) VALUES
(2,	'test2',	'pbkdf2$10000$c1429ca7740bcb7df6a4a61641fba8e958c07b4821f02d802013dad6a342ee886fd59d213dfc42402e0984a3dfe939c471411495fdb9d1c2b942abbc5aec57b4dab9389a8e610169cb82cdebad12f52c50cc907aac03ff146abf331006cf615701c55f8873c6ee5bc1dfe7b53e1d42e4b367ead17d1bf0c56db2a51f4abb6e15$0237e19df064a6feb5ade7e247ee0aec51f39b42daf4abb68e58dcf12e54880a7b0cef17bb7a47c40d2d06526b498f1a1e1a1d000ede45fbdec907adca3c98ac7c9a80d06113b5b01ccd2df27cb73635942e2d187cc448683796805c504909452b62eaad87e92d81a17a55cf3ee460f01d65d2860d9d97be994738ce14a3c8ee6e4f52cefeaab182385a650f3080680406149c473a0f85bf98cc3f7074b5ac7c5a995253845d97df59ae55a0ba878af437dd57537c4dc1c2b03a2761938d8fea5bc0ac385d62cc6f679091b25362ac692572ff67c0c86a3e8588bc387711290e0759f3e351d4802f23249a7a9833f2d54c633b9f85488ab4038f495edcebe8a0b881df769f609e06a2da86c913436a5d2a0855175f00e32ff75c71722a99c434087d032024533afa482d3f47d82f39a3fa264ed1786cd5caaaa32f2bf60fe1a8241d2119088cfdf251e38f5828d138d7294aad96a0b505a3ed56483a35c6c160abf9e1d30e6532bb4673773971117c1e71d1a428a5b09444444a6bd07f5d59c06fb160726daf2c2cb23bf84011ead95f1731f90b5180047c8613080850141d6459cace4331633c29448eacba6f4bb5329573756c062795255732432d3f598e116ac100d699887dc2a4e3b52f005802ce9ac299306d7c9ca96409f54197c64e7fda4f88c219d3846dba8db0142cca433288da0a9ba352b13fb133c965be832893',	'test2@tests.com'),
(12,	'test3',	'pbkdf2$10000$0fc3a2c12af73df997ea282dcd1416a3b4b8a99c319b1297c5a8d8935b905ae1ae08ca8aa57c2231200bd2566ee3e90046752aca04bda8b1c488dac45beb0c2cf68acb94056a848bfb65917dc77b7781cb4f5981192bb51ae5a301a86c19086cad893d9131a095a8c99ab8023d6510c8eb981915268224a929bc59ed90a78556$ed9b94cb01c44e6438cb8ce35e6f21c2c71226851a5169bf87ee06b50bc9c1adf06beae9f32c02a302bf3976aa82733f8b4790dcd4c78a3db1de94539a3d5ea1178bd8b9125cc542a6e470d42d4f0cd74251d20773a1180143222bb72df24dc7af4bd28960abbb6687baf813411b33437652b52feaf32be3fd724c18d392d64970a6751dd58e0b761cd3ead4db859e14ee57c071afa3b772f1a37690aec944bf18a10b66d5fd7f0921f5169e07edbd187def7251343b6ab543efdfb879c19ff391439e0d284b8ebcc7d880313ec702cb865dfae7240ea1de500e91fbe0e945e28f72489e79f218d5c7fffab1536168db111ba6b478fe811eb94bcbf0111d3ba980f72b5d1bd5ed082de67b2d9711a3bfa1601e257ff298e83e24ddfffc4387da4864088b3d2bd4601daa31e4c317e3fb2ad46964274efde901fee9adbef72b4ed255deb7da0d33230b4141f4b2d8597be25c086c2f68fc57816136e2423964f2e87e8e9e764472e56c9f1d1735c10610c8767ade046c84464ea7d200ebc59d8fda1ca70d079a3ae8caa5fe3de6c3fb756be93f5fb419e6da5b6f84e5784c9d1bccf768d113d5732677dc1ef212018bb8d9fbd6caa0c92d49deaf1fb83024600a5dd24746f98dd193e26dbe5a9ca81fe3d466da4c5e94c4d25789248400e60f8b9069456082625840143349073d22f306b2a7ba42763d6f5babc9a1f7b388cab7',	'test2@test.com'),
(13,	'patih',	'pbkdf2$10000$561919c0efb2079561c4d275a73b25fd6007d7f2daf2d19f455a2da508299c4f9bc7d822c4903f3ba0c91c371a95731106bc649d9ab4d290edca0697c6652f9a32920840f6976cac1b7f37a80e64c2527ef0f942064f27b249b0c1c8e6ca2c2ab0fdbeeb39194dad193e32cee9588726bceb5b59c937469f69993108696d28ef$1d95f48ad6bed5ae8100eea84971a462db744dcb0111d1d30e350ab395f55bf1e4143e62babd10ea8e9afbe7aeb601fe1a047103216c39ebf95ba8835213e58da408d1502d3b674e333ff76f38440964a9936fc5a1ec22fd2c4dc0eccb888c0845ea92d70e0651bfc0b98e7543c39ea0780ec0e519bfc2a84e238e3c4a57973391abb25baa737ee78681c3b4dfe370b7c3af487eec4906977eb5516a6468c9d56ccb79d45f6df8abc5218b4b5dbed41ab9041baef54df3c1f7a986cd4c5ecbd7c27455cdf98fd15f3c7d5ba2128c44228c326e576703b52d12895fc79505f6fbe9823a2d863c161f433054a835fe6b69bd3e85fb244f1f49cb96eb79732da75628f22fb7f4156c8dcd4377e5962dd86f4aff01093c176fbc804b387ba4c0b789778f4bfe427f5bb55edc2acbbf359de4a894d2f5b6f29161b6e0a214c4b8318166b0227445f1a4f7da4bea675716f82927e26442d775cf9c33dfb0004cd2d5099fd60fb33ff9401e26a0b90d849127a6906b7577cc787aad7c8dbd27ebf2d1665d53ce56be1fe901e998e32c035e6006d8f3fdfd29ad4b9e4146b7510f8b583def04d8192faa4015976d181a66c9c430addb118231f7c17ef9c0cfadafabfaccd120c57d9693371d2215850f44a877cac3d951679cd7ee21470cfce492c0bf446bbe5e7321853f4346624810140e3794998013b3730f9f6066d238743656961c',	'test@pati.com'),
(14,	'tester',	'pbkdf2$10000$b1150698988bea66690fef7bdad7d7fb195b34bc1ab6c04d2488e39cb7e0789560bd9dff2ba3145b484b3c3bb6c7d270e4defa93f7339aff10fcb1ee13f1d6374f2cad920a74b12c4a9f973b09ad1d4f818aedd9d174e538e32ec3263e5ca551f54691fddec6bdbcd4171f8b05f3ace9ac0ee17ef9c313761fa1074e2b3bc93d$e772371a51aa0988b981881db0fc07308a7a2bb73a3f3dcd5514a66a836c2f7916f5fa2055ba34c4629bec4dad5098d2bfde1944701775b4757f3dc79ff6764dbc4aace9e5ba15c2f0368543ea387e0bd8c6c6716577fdc8bee95a96d2f6e5cf8fc4dd998a7fed9c974a067df11153a99fed5f31d77f19da48411b733d1d1315a410fbeae2a8fd96d736454e5f9737b8341c5e13bce4d96ba6625c06af9b10e02d054f356814677bd2a3d07ec139626972f59483146bf05f49dd76c491ef4bb81872a2c90f329c5f19041b431e95fd309a4b2894ee9bc5178e92783488bd0b818f2621594f2ff7ffce92165c2cb3d9df94d185c1924944a2b5b743fd649c201be721652608697c77a817ee25bc6aba681a4af2d88fad8c5ba6c37154eed5dfd3ca233eec6faf044004421d17e301519d1bf22c75b26890019dc62424a2fc2e1f681caab2b321fd3528b9bd8cdf4e7c8902e37af1c1c2079647b0d4588f8688c60d48fbcd2b8c43055dbb28fe6fca9f7d558434c94839f665f290c494fa800fe5927ea2c725dacf20e2b57b06441e89515d732f4cc6286ac128a4e2337ddee0567c11651b9a71da6bf4f2d6c126ab2a05338c764753a09efbe2a1481c7a65ea1eef3ded0795e1e647fa88e1d53f486734a5c6824b4cbb500209a64e5eff14f41cbfec07486dd0153a55c06284d5d0372a8b391d5766310769270b5e6768e7c7bd',	'tester@test.com'),
(15,	'EpicThunder',	'pbkdf2$10000$4c22c3021435e31c69df9d736032e261edacd3f6a5fb6d69a75f336330e38e54f8875eda3dfa4f1ac7720d61e68bfcd0ab5e9d579bcce7b103ca2468ba1919678dc2e7b33f5bf1e1692b98ef4a251ca5fdb760ee80e749a787fbbaddf6b6b04b112e38d5cc4bfd8e1f19b4f7bda239c253e9ba6ae52b70299ef21b6fe179c399$a42d692a181e52f5d9e41f596a64e07cb20e1afc1f48c9148949102f7f9e5f950169e49ccfc694d95f7e46a3ad6f2d9b2780dbc8bd2d6857bada5f5acf75bbb9dd9aa3c3051be1411056c8dd0f888a02360ae46f37b6e3371d040f3723900ef6231240950266fde51da40351ac90fcdbdf5358dddbb3e6ecec4728f1e2e2b1062f924afa17e98b26a68c0523ffbac5df29ef35a19f2c7ef9906daaf583180d44902ab7970c09af7801ef3577652d419e12761c4cf975face8e079213d95d45652b9b061c6cac8c8fbe0d125f1d58e824dc8320010ba6c74451f520bf8067adb60d0ada351f6c5112ed6fd5de5a24087423b1976686fcbd236ec2f9a9d6a85094746055211019c59edaf1dfd05df308a609d01479429c1a0b2a2753b3f9466cec42be5a3d786ca659ef0a838a0f53ef88b0772adfa730515a4a294354d99d27ecc741b022d51f755aa996b2a7a4c34acbaabbcd918732729e70637c24afd27efb9f0f3da57d0c6deff3b2d9ca47636a7079582355b5e4ee5488b533805710adb3b7d9b2e41918cdd1e9dbe9e84e4e30e980ea1f860653ee7a01ed5685a4ec7eee7f7ed81022475ee023a7da476e0f094177463eb90e2f34c1106ecc46d242fb53b7e2ae17ab55f807bde41a399079938609de7d77cf27c340860d8ecd108cffdff0663cb62b1c3d54b57c065094929986f7de04cd1ac7932f2ba7d996ca395fdf',	'epic@epicbonna.com'),
(16,	'hello123',	'pbkdf2$10000$1017ce394e52783736ca4bc8aff2e9f1df9d47849ed1d4e144bb99f3e80a58aff5e9bd20c9f7baa832e5a5eea54c943fb3cf210d4cdb5ba4775ddfe42cd2ab065d63f9a84868ce101b6b023692f7e4a022f0c7d3e701a415668de77255d86b108d9d04910ba2a81f685d21107f2f76f6d51bfffa52409e5193d3eed8242308b9$cea9023e4f8ea78063cb172ee88e5fd60c4fb0375afc91dfd7c2408af07a51a6fcf7c7cd6b3f6d6350b22c30436bdac19d0e382881081bc709a70741e66d8bdf3ac0ac2d7cb0fd8876ccbe8941d37cbc3d9aa11d1f6addf37547e52a2b9682d08c2dd008de1021950976cf21a481ee748b9963517ea9852b62ca6b8bdeaca68ac02b93068e5d59ee972973f47c62f0b7a4b06ff65bd13b236af964056e71559cbfb316fa5cfc9d3e17a1df25dd84547b6eb09a6141e6cee4e0758e26e3aae14c8e06cb1351de2b20a9711f80526f6f684ef5a8c858ce050d0c487c243e651d2c1df0619214e2efe3e03a42d0281ee24ee9c4c95292d2ded4d29937c3daba0a007507916967b400189ebea95eb3abda5f85ba20c7e506e716009ca83cf1d7de161ecc0cc8799b25151b1309db26eafa626254916a88d3927be764422f9c51c1f07afc42d805836d926c53a14c8a00685b1f44d0124f098b6d88b182b3b0ad78e31478f102f680d1ccf8119ca26c75d1baab4aa4ba51cd234e7572cd2fd2c122563feedcd989ee5e642b21535a77ac193c2e11b13fee71be176d3cd0442a3ba191a324020c082177f90003c13cde7e14b9dbaeb3a3b6c85c74667c14a86b5881e3101dd4467cf149aa4f472ad178fbcca9b0a9330a25f7ec71ff36c71ed92c3ed29fefb80bfece5372c5f742236f1b012fff1d66d2cb5e5cdffe2b88528735412a',	'hellohellohellobonna@bonnabonnabonnanonexistent.com'),
(17,	'user10',	'pbkdf2$10000$18cebbd6312a3894b6d29f831ab132710117c764e083451027a0a7c4df3619ac7b4ea65814a32cf9168a534a995faed64a755a9a1565b546adc8a9b098c8557315963092e544d7599bd3b9f22c01633cd8a479232d2a12bc4149069dfd85e688a0fa6818a66b722336c2bf9c130f006f6d43d0e893f837467ab646caac9123b9$86adec4a4889dfacee52d87c6d5dde6467df98adfc681758d1ba14a3047c33ee3d19c2c37381c3beb66f09feae0f4832fcfc92f44d8574ef0d3023641c1dfa0d40372c7b5de3d99798e0a6e589475d717e8a4e1c8872fa702776ce53c7a66c32a2e7d958039d5dd83e81459fd970e0d502667533f25c6d5ec5360787d1577b3a9a21627a573b97189fefbbf3b4aae4c0749b6babc71a8b45856f189be82c348072372d9aac4a5646999ff4936267daf4c5dd4f78ddaee51168374f862ab2199f833ae0e1f1db5c75c95c8ca45c4b147bb704182dacd3ff2989fdf7ffa385216054701a4a1b6e7aa9569877eeb1878376c6024f6f4b79e43fc669c8e4815579bbf84ee90a492058931aba4240ded9b27ad08498a64cf8c67504f30eacb8bbcbefb8df53738acece0e092275ff2165c698ec2da33bfa5854e1601ebb7498ca36778554c8bdd1fcf040fdf8c1d3a7b285537a6abbfb6775e3761c4c88a0a1c17cee435bdc59048370e87abdbe21342d41a57b7ba6dfa107d5288d56cd8cf8739f56ee8f3f4c14f4f5c25e735671a0ce009fed879a265d8f4f8bbbd57582b7f4c6b8ed8782d391af98a43e69eec0d9205e9cc102f484af99687c7a228100a7812c3acc5dd2cf2485d134d28d2385d19fbd278e3d2b73e466e3eb9b76f9e3a53ad0744bdb7a03e461ee876fdc168a70d227e28fc77ff6fdd91c31deb82367bd8b744a',	'user10@testestestest.com'),
(18,	'aaaaa',	'pbkdf2$10000$ba80fa564948c3bbe8c84d37950402fc57c305de4de75ef08dd78788e8e4910131380bccf3d031eede1922eb79eda84a0677e445e1011809634f3f8e2c082c67c0a1f2361ece789c460fbf44d3f8c685fa834b6cadae6eb9bbfaafef6ad20a8bd559fc163462314938a22b3a8b09ada2f68ee95704ae519246c9b9505c9eb499$ac38e4b7db1d06b91955010f365b319d12b56853f394708a7785259da6ab921218a5ab852bc55486fecbc4c0a92f2ca05f277535c1a5c4a62ac34fcfba04f8839d0d52d4a6101405123122d8a7038404d1316b7ecb79e38f77737019da68c47227b43b0c487966b981cc3ef49296ccf52b6fc82c3f6bbc29dd10d9f8a3dbc23e421bf71c0bef232bdf141a8564f6cf737bff11fecde1ff25bf413f22450e6b1c8ea30bed1ca8d4afe3c787f8c6604d3d9d8c103915f6c3e1c822076f744ec4b1ab52d56eb2c89a30da2b3926c4bcde018d388c2cc3207261c4f767232e2c9875aeefac8db8655bc811894fe8461d913526ad48d36677cae00dfd6001c7ca03fc94d0be5ebe0d67a7d1837d779559baf272a376c9471327d959037e18e1a61ab06661510db1f8ce576fb0accbd333358360ad73752f4ec67f94d24b1f079bc388fafc339bd85adf9b64594df635bba6aadc41da734655f6cf32af00fba82184c2050bd3004ff8d9eda6b6669d4a071ce8fe5742733484db189d7622a44a69ddd3710ea9d8a9710d79264404050360d656c6f0c721255230e63f38f0fc2c711d5ac3fc6b6f99a107111d9a79d9c833d8ae361f75e693d4e522798381e9f516252b0ba0853d2177bb57a80961fa0c8af384035212a870f2018b1587869e1ba6a0654d577ddaae7b3471ca733b8abd0d6e663f1dce5a2be3c6c02d2e27d3671e5c0a',	'a@aaaaaaaaaaaaaaaaaa.com'),
(19,	'aaaaaa',	'pbkdf2$10000$03043dd85a2354feaa285483710fe0628a5816999105aab99e7218601861ad0f38b15bec5b74f4123304d50ff407617968c3ee53b2dce567c85c8d6791d040a1998498c63b2f1d7f6afbc836f380338f0dcf88bb365f4e823c1e1bb467d00f6268f2bfae219f0918b756728ed560bef2d6b65640bb9403cc0940e202f44e5837$103f331013bc2d2b56e312c8a82532a877656150208e6fc92d4a2e281189d6d5d9410e2e1008e65c27d32a6dd7acc3852b8b0ca9169f79e1b302c58e765d82d86922cfccba868631bf217b68d8f00bcd4c0879419cbd9281948519072c21f53e08945796356f207ea45f9c2c8176f4d80454f008a0f5de182687e2e68e0ca55151f8e6a0ca5a3c9fb1b3969c47dd869f2dcac6e691d6076fd1fc45be729eee0ce0e0f7e2880148b28132a29fc25b3528597ade41cfa1bf618511cdb44a5f4d300ca9ea115eeb92d87b8c2ae217e1fff7006a72df9bd74c4b27f9bc8578babd1bbea72f00be351a9ab9ac7799d8f3ccd084f4dccd41b15ea1497ede7f7dec38f77c527935f6f0f034105aa038e5910da37290933b53e7e87ecd800ce9bc151cf4348bb77ad5349457b38e2d266c4abcd3edb08173d328d8a289f4be0b5b5a1b3afb7a41c0ad55a44336ade0cdbc03eace0c49450eda5aa662386661f518e3f49f2a4150c01abc73f82cc833b7d73cad84c2018a4b9af2329222f13c8e82dc3054bbd037fa619fae3479fd0208e1bba0cbe3da4f6df74b0ea3029c6b4c7cf10328fe40c8c536e6c4d46d6cb237a22cb33b773f03f49581c116b86c5b6f01ab109b78a0f687aea18d0ada9629ccc05412396ffb42dc804503cb1a18e02431893b89791b748d9f1fd7034fce58fc74130e11a8c69fc6d73e035619bb7f203f8be879',	'aaaa@aaaa.com');

DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` varchar(6) NOT NULL,
  `student_name` text NOT NULL,
  `grade` int NOT NULL,
  `section` varchar(2) NOT NULL,
  `roll_no` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `grade` (`grade`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`grade`) REFERENCES `classes` (`Class`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `students` (`id`, `student_name`, `grade`, `section`, `roll_no`) VALUES
('7A22',	'Devansh Nagrecha',	7,	'A',	22),
('7A23',	'Hrithik Sankhala',	7,	'A',	23),
('7A24',	'Janak Shah',	7,	'A',	24),
('7A25',	'Kaushik',	7,	'A',	25),
('7A26',	'Parth Shrivastava',	7,	'A',	26),
('7C29',	'tester7',	7,	'C',	29),
('9A22',	'Pranav Kulkarni',	9,	'A',	22),
('9A29',	'Pranav Vaswani',	9,	'A',	29);

DELIMITER ;;

CREATE TRIGGER `student_id_INSERT` BEFORE INSERT ON `students` FOR EACH ROW
SET NEW.id = CONCAT(NEW.grade, NEW.section, NEW.roll_no);;

CREATE TRIGGER `students_id_UPDATE` BEFORE UPDATE ON `students` FOR EACH ROW
SET NEW.id = CONCAT(NEW.grade, NEW.section, NEW.roll_no);;

DELIMITER ;

-- 2021-09-17 05:33:12