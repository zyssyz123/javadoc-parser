-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: Parser
-- ------------------------------------------------------
-- Server version	5.7.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `error`
--

DROP TABLE IF EXISTS `error`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `error` (
  `errorName` varchar(255) NOT NULL,
  `description` text,
  `bel_package` varchar(255) NOT NULL,
  PRIMARY KEY (`errorName`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `error`
--

LOCK TABLES `error` WRITE;
/*!40000 ALTER TABLE `error` DISABLE KEYS */;
INSERT INTO `error` VALUES ('AbstractMethodError','%0AThrown%20when%20an%20application%20tries%20to%20call%20an%20abstract%20method.%0A','java.lang'),('Annotation Type','Description','java.lang'),('AnnotationFormatError','%0AThrown%20when%20the%20annotation%20parser%20attempts%20to%20read%20an%20annotation%0A%20from%20a%20class%20file%20and%20determines%20that%20the%20annotation%20is%20malformed.%0A','java.lang.annotation'),('AssertionError','%0AThrown%20to%20indicate%20that%20an%20assertion%20has%20failed.%0A','java.lang'),('AWTError','%0AThrown%20when%20a%20serious%20Abstract%20Window%20Toolkit%20error%20has%20occurred.%0A','java.awt'),('BootstrapMethodError','%0AThrown%20to%20indicate%20that%20an%20invokedynamic%20instruction%20has%0A%20failed%20to%20find%20its%20bootstrap%20method%2C%0A%20or%20the%20bootstrap%20method%20has%20failed%20to%20provide%20a%0A%20call%20site%20with%20a%20target%0A%20of%20the%20correct%20method%20type.%0A','java.lang'),('ClassCircularityError','%0AThrown%20when%20the%20Java%20Virtual%20Machine%20detects%20a%20circularity%20in%20the%0A%20superclass%20hierarchy%20of%20a%20class%20being%20loaded.%0A','java.lang'),('ClassFormatError','%0AThrown%20when%20the%20Java%20Virtual%20Machine%20attempts%20to%20read%20a%20class%0A%20file%20and%20determines%20that%20the%20file%20is%20malformed%20or%20otherwise%20cannot%0A%20be%20interpreted%20as%20a%20class%20file.%0A','java.lang'),('CoderMalfunctionError','%0AError%20thrown%20when%20the%20decodeLoop%20method%20of%0A%20a%20CharsetDecoder%2C%20or%20the%20encodeLoop%20method%20of%20a%20CharsetEncoder%2C%20throws%20an%20unexpected%0A%20exception.%0A','java.nio.charset'),('Deprecated','%0AA%20program%20element%20annotated%20@Deprecated%20is%20one%20that%20programmers%0A%20are%20discouraged%20from%20using%2C%20typically%20because%20it%20is%20dangerous%2C%0A%20or%20because%20a%20better%20alternative%20exists.%0A','java.lang'),('Documented','%0AIndicates%20that%20annotations%20with%20a%20type%20are%20to%20be%20documented%20by%20javadoc%0A%20and%20similar%20tools%20by%20default.%0A','java.lang.annotation'),('Error','%0AAn%20Error%20is%20a%20subclass%20of%20Throwable%0A%20that%20indicates%20serious%20problems%20that%20a%20reasonable%20application%0A%20should%20not%20try%20to%20catch.%0A','java.lang'),('ExceptionInInitializerError','%0ASignals%20that%20an%20unexpected%20exception%20has%20occurred%20in%20a%20static%20initializer.%0A','java.lang'),('FactoryConfigurationError','%0AThrown%20when%20a%20problem%20with%20configuration%20with%20the%20Parser%20Factories%0A%20exists.%0A','javax.xml.parsers'),('FunctionalInterface','%0AAn%20informative%20annotation%20type%20used%20to%20indicate%20that%20an%20interface%0A%20type%20declaration%20is%20intended%20to%20be%20a%20functional%20interface%20as%0A%20defined%20by%20the%20Java%20Language%20Specification.%0A','java.lang'),('GenericSignatureFormatError','%0AThrown%20when%20a%20syntactically%20malformed%20signature%20attribute%20is%0A%20encountered%20by%20a%20reflective%20method%20that%20needs%20to%20interpret%20the%0A%20generic%20signature%20information%20for%20a%20type%2C%20method%20or%20constructor.%0A','java.lang.reflect'),('IllegalAccessError','%0AThrown%20if%20an%20application%20attempts%20to%20access%20or%20modify%20a%20field%2C%20or%0A%20to%20call%20a%20method%20that%20it%20does%20not%20have%20access%20to.%0A','java.lang'),('IncompatibleClassChangeError','%0AThrown%20when%20an%20incompatible%20class%20change%20has%20occurred%20to%20some%20class%0A%20definition.%0A','java.lang'),('Inherited','%0AIndicates%20that%20an%20annotation%20type%20is%20automatically%20inherited.%0A','java.lang.annotation'),('InstantiationError','%0AThrown%20when%20an%20application%20tries%20to%20use%20the%20Java%20new%0A%20construct%20to%20instantiate%20an%20abstract%20class%20or%20an%20interface.%0A','java.lang'),('InternalError','%0AThrown%20to%20indicate%20some%20unexpected%20internal%20error%20has%20occurred%20in%0A%20the%20Java%20Virtual%20Machine.%0A','java.lang'),('IOError','%0AThrown%20when%20a%20serious%20I/O%20error%20has%20occurred.%0A','java.io'),('LinkageError','%0ASubclasses%20of%20LinkageError%20indicate%20that%20a%20class%20has%0A%20some%20dependency%20on%20another%20class%3B%20however%2C%20the%20latter%20class%20has%0A%20incompatibly%20changed%20after%20the%20compilation%20of%20the%20former%20class.%0A','java.lang'),('Native','%0AIndicates%20that%20a%20field%20defining%20a%20constant%20value%20may%20be%20referenced%0A%20from%20native%20code.%0A','java.lang.annotation'),('NoClassDefFoundError','%0AThrown%20if%20the%20Java%20Virtual%20Machine%20or%20a%20ClassLoader%20instance%0A%20tries%20to%20load%20in%20the%20definition%20of%20a%20class%20%28as%20part%20of%20a%20normal%20method%20call%0A%20or%20as%20part%20of%20creating%20a%20new%20instance%20using%20the%20new%20expression%29%0A%20and%20no%20definition%20of%20the%20class%20could%20be%20found.%0A','java.lang'),('NoSuchFieldError','%0AThrown%20if%20an%20application%20tries%20to%20access%20or%20modify%20a%20specified%0A%20field%20of%20an%20object%2C%20and%20that%20object%20no%20longer%20has%20that%20field.%0A','java.lang'),('NoSuchMethodError','%0AThrown%20if%20an%20application%20tries%20to%20call%20a%20specified%20method%20of%20a%0A%20class%20%28either%20static%20or%20instance%29%2C%20and%20that%20class%20no%20longer%20has%20a%0A%20definition%20of%20that%20method.%0A','java.lang'),('OutOfMemoryError','%0AThrown%20when%20the%20Java%20Virtual%20Machine%20cannot%20allocate%20an%20object%0A%20because%20it%20is%20out%20of%20memory%2C%20and%20no%20more%20memory%20could%20be%20made%0A%20available%20by%20the%20garbage%20collector.%0A','java.lang'),('Override','%0AIndicates%20that%20a%20method%20declaration%20is%20intended%20to%20override%20a%0A%20method%20declaration%20in%20a%20supertype.%0A','java.lang'),('Repeatable','%0AThe%20annotation%20type%20java.lang.annotation.Repeatable%20is%0A%20used%20to%20indicate%20that%20the%20annotation%20type%20whose%20declaration%20it%0A%20%28meta-%29annotates%20is%20repeatable.%0A','java.lang.annotation'),('Retention','%0AIndicates%20how%20long%20annotations%20with%20the%20annotated%20type%20are%20to%0A%20be%20retained.%0A','java.lang.annotation'),('SafeVarargs','%0AA%20programmer%20assertion%20that%20the%20body%20of%20the%20annotated%20method%20or%0A%20constructor%20does%20not%20perform%20potentially%20unsafe%20operations%20on%20its%0A%20varargs%20parameter.%0A','java.lang'),('SchemaFactoryConfigurationError','%0AThrown%20when%20a%20problem%20with%20configuration%20with%20the%20Schema%20Factories%0A%20exists.%0A','javax.xml.validation'),('ServiceConfigurationError','%0AError%20thrown%20when%20something%20goes%20wrong%20while%20loading%20a%20service%20provider.%0A','java.util'),('StackOverflowError','%0AThrown%20when%20a%20stack%20overflow%20occurs%20because%20an%20application%0A%20recurses%20too%20deeply.%0A','java.lang'),('SuppressWarnings','%0AIndicates%20that%20the%20named%20compiler%20warnings%20should%20be%20suppressed%20in%20the%0A%20annotated%20element%20%28and%20in%20all%20program%20elements%20contained%20in%20the%20annotated%0A%20element%29.%0A','java.lang'),('Target','%0AIndicates%20the%20contexts%20in%20which%20an%20annotation%20type%20is%20applicable.%0A','java.lang.annotation'),('ThreadDeath','%0AAn%20instance%20of%20ThreadDeath%20is%20thrown%20in%20the%20victim%20thread%0A%20when%20the%20%28deprecated%29%20Thread.stop%28%29%20method%20is%20invoked.%0A','java.lang'),('TransformerFactoryConfigurationError','%0AThrown%20when%20a%20problem%20with%20configuration%20with%20the%20Transformer%20Factories%0A%20exists.%0A','javax.xml.transform'),('UnknownError','%0AThrown%20when%20an%20unknown%20but%20serious%20exception%20has%20occurred%20in%20the%0A%20Java%20Virtual%20Machine.%0A','java.lang'),('UnsatisfiedLinkError','%0AThrown%20if%20the%20Java%20Virtual%20Machine%20cannot%20find%20an%20appropriate%0A%20native-language%20definition%20of%20a%20method%20declared%20native.%0A','java.lang'),('UnsupportedClassVersionError','%0AThrown%20when%20the%20Java%20Virtual%20Machine%20attempts%20to%20read%20a%20class%0A%20file%20and%20determines%20that%20the%20major%20and%20minor%20version%20numbers%0A%20in%20the%20file%20are%20not%20supported.%0A','java.lang'),('VerifyError','%0AThrown%20when%20the%20%22verifier%22%20detects%20that%20a%20class%20file%2C%0A%20though%20well%20formed%2C%20contains%20some%20sort%20of%20internal%20inconsistency%0A%20or%20security%20problem.%0A','java.lang'),('VirtualMachineError','%0AThrown%20to%20indicate%20that%20the%20Java%20Virtual%20Machine%20is%20broken%20or%20has%0A%20run%20out%20of%20resources%20necessary%20for%20it%20to%20continue%20operating.%0A','java.lang'),('ZipError','%0ASignals%20that%20an%20unrecoverable%20error%20has%20occurred.%0A','java.util.zip');
/*!40000 ALTER TABLE `error` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-08-07 14:19:19