---
layout: post
title: "Using Enterprise Library To Decrypt a Java Encrypted Message"
date: 2013-10-05 -0800
comments: true
categories: [ASP.NET, Java, Encryption, Enterprise Library]
redirect_from:
  -  "/2010/10/using-enterprise-library-to-decrypt-a-java-encrypted-message"
  -  "/2010/10/using-enterprise-library-to-decrypt-a-java-encrypted-message/"
---

Last week I stumbled upon a tricky problem when tasked with encrypting and decrypting messages sent between a Java and .NET application.  The Java application was responsible for encrypting a message while the .NET application consumed and decrypted the message.  Ignoring the debate over the usage of an asymmetric algorithm, I was required to use a symmetric algorithm, specifically Rijndael.

Since we are primarily a .NET shop I was expected to use the Enterprise Library, for good reason, as it simplifies encryption and decryption.  I quickly realized the simplicity gained on the .NET side was a trade off for additional complexity on the Java side.  To start let us look at the basic Java code needed to encrypt a string.

```java
public String encrypt(String auth) {
  try {
    byte[] key = // shared key as Base 64
    byte[] iv = Base64.decodeBase64("IV STRING");

    SecretKeySpec spec = new SecretKeySpec(key, "AES");
    Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");

    cipher.init(Cipher.ENCRYPT_MODE, spec, new IvParameterSpec(iv));
    byte[] unencrypted = StringUtils.getBytesUtf16(auth);
    byte[] encryptedData = cipher.doFinal(unencrypted);
    String encryptedText = new String(encryptedData);
    encryptedText = Base64.encodeBase64String(encryptedData);

    return encryptedText;
  } catch (Exception e) { }

  return "";
}
```

From the code above you can see we have a method that performs a pretty basic encryption.  Now let us look at the .NET code we will use to decrypt the message encrypted using the above method.

```cs
string message = Cryptographer.DecryptSymmetric(“RijndaelManaged”, encryptedText);
```

Next, I built the applications and tested out my encryption and decryption methods and they soon failed.  As you can see above the .NET code does not appear to use an IV.  Thankfully, Microsoft published the Enterprise Library code.  After taking a look I noticed something interesting.  Microsoft randomly generates an IV each time the EncryptSymmetric method is called and then prepends the IV to the encrypted message.  Accordingly, the DecryptSymmetric method assumes the IV will be prepended to the encrypted message and extracts the prepended bytes before attempting to decrypt the message.   I then went back to the Java application and added the following code.

```java
encryptedText = Base64.encodeBase64String(encryptedData);

byte[] entlib = new byte[iv.length + encryptedData.length];
System.arraycopy(iv, 0, entlib, 0, iv.length);
System.arraycopy(encryptedData, 0, entlib, iv.length, encryptedData.length);

return Base64.encodeBase64String(entlib);
```

Again, I built the code and to my frustration it did not work.  However, this time the .NET code actually decrypted the message, but the output resulted in funny characters.  Now I suspected it was an encoding problem, but I was still confused as I knew the Enterprise Library used UTF-16 or Unicode encoding.  I decided to open up the code in Visual Studio and I realized the Enterprise Library did indeed use Unicode encoding, however it used little endian byte order.  So I went back to the StringUtils API and found a static method called getBytesUtf16Le(String string).

So I replaced:

```java
byte[] unencrypted = StringUtils.getBytesUtf16(auth);
```

With:

```java
byte[] unencrypted = StringUtils.getBytesUtf16Le(auth);
```

After building the code I finally had this little problem solved.  This turned out to be a bit more complex than I initially thought, however thankfully Microsoft provided the source code needed to solve the problem.
