---
layout: post  
title: "NoSQL vs. NewSQL: What's the Difference?"  
...

NoSQL and NewSQL are two types of databases. It is often told that the
field of database administration is often dull and boring but the
exciting words like Big Data and IoT have increased interest
tremendously in the database field and a lot of new databases –
CockroachBD, Riak, and Voldemort – are sprung out of nowhere. Here is
how the two databases – NoSQL and NewSQL – are different from one
another.

**NoSQL Databases**

NoSQL databases can be defined – in simplest terms – as those databases
which do not use rows or columns to store their data. In other words,
they are ACID compliant, not BASE. In CAP theorem these databases
sacrifice C for AP. There are different types of NoSQL databases

-   Document – MongoDB
-   Key Value – Redis
-   Graph – Neo4j
-   Column – Cassandra

Different NoSQL databases are used for various particular cases. Since
Neo4j uses a graph, and, therefore, draws relations between entities and
thus is used by many social media companies. Because of its
documentation system, MongoDB is used for e-commerce websites. Redis is
used as a queue that sits in front of any other database.

**NewSQL Databases**

The term NewSQL is used for many high-performance database vendors. It
was previously called “ScalableSQL” in contrast with the binding
relational databases. Its predominant feature is its horizontal
scalability, which is not the feature of many database products and thus
the new name developed NewSQL.

The important thing about the NewSQL vendors is not the SQL itself but
vendor. NewSQL vendors are the collection of many high-performance
databases on the one hand, and on the other provide solutions to
problems regarding the compatibility of the relational model to
distributed architecture. Scalability, which was previously an issue, is
reduced by the increased performance of relational databases.

NewSQL vendors are much new to the industry. They are ACID compliant and
are highly scalable. Here are few NewSQL databases

-   VoltDB
-   Clustrix
-   NuoDB

This guest post is written by Kyle Ward, he works at [Rebates
Zone](http://www.rebateszone.com/groupon).
