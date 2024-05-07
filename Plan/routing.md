```mermaid
flowchart TB

A(App)
H(Header)
Ho(Home)
Ar(Articles)
Arid(Article)
Arc(Comments)
To(Topics)
Pr(Profile Page)

Ua(User Articles)
Uc(User Comments)




A --> H

H --> Ho

H --> Ar --> Arid --> Arc
H ---> To ---> Ar
H --> Pr

Ho ---> Ua
Ho ---> Ar

Pr ---> Ua --> Arid
Pr ---> Uc --> Arid
```
