---
id: bdwhaei947bfrx4
locale: en-US
title: Generating MD5 hashes on Node.js
created: 2024-01-23 13:20:06.581Z
updated: 2024-01-23 13:29:10.648Z
tags: Node.js, javascript
translates: zj7xcfn2r753ld7
---
You can create hashes in Node.js without the need to install any external library. Usually, I create the following utility function in the projects I work on:

```javascript
/**
 * Hashes a string using md5
 *
 * @param {string} str
 * @returns {string}
 */
export const md5 = (str) => createHash('md5').update(str).digest('hex')
```

And I use it to replace the [md5](https://www.npmjs.com/package/md5) library whenever I come across it.

Note that you can create hashes for any algorithm supported by the OpenSSL version on your platform. On Linux and Mac, you can see which algorithms are available with the command `openssl list -digest-algorithms`.
