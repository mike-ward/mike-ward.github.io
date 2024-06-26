---
layout: post  
title: 'HttpWebRequest GetResponse() Gotcha''s'
---
If you read the documentation for HttpWebRequest.GetResponse() you'll see that it returns a HttpWebResponse() object. One of the members is Status that tells you the status of the server's response. Fair enough, but there's a gotcha here. If the server returns an response like 403 (Forbidden) or 500 (Server error), a `WebException` is raised. This strikes me as a bit counterintuitive since the server did reply with a valid HTTP response. Fortunately there is a way out of this conundrum. A "note" in the `GetResponse()` documentation gives you a chance to still determine the status.

> ** Note **
>
> If a **WebException** is thrown, use the [Response](ms-help://ms.msdnqtr.v80.en/P_System_Net_WebException_Response.htm) and [Status](ms-help://ms.msdnqtr.v80.en/P_System_Net_WebException_Status.htm) properties of the exception to determine the response from the server.

Personally, I think if the server gives you a valid HTTP response, even one indicating an error, it should not raise an exception. It's not that unusual to get error responses from servers. Raising these errors as exceptions introduces exception handling into what can be considered normal control flow. Generally, this is frowned upon because the situation is not "exceptional." Also, exception handling is many times slower than straight-line code which makes it a poor choice for control flow. To quote the CLR team, "Exceptions should be exceptional."
