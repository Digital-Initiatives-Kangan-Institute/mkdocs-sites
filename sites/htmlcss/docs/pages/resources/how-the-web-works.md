# How the Web Works

Before building webpages, it helps to understand what happens when someone visits a website. This page explains the World Wide Web, web browsers, web servers, and web addresses.

---

## The Internet and the World Wide Web

The **internet** and the **World Wide Web (WWW)** are often used as if they mean the same thing, but they are different:

| | The Internet | The World Wide Web |
|---|---|---|
| **What it is** | A global network of connected computers and devices | A collection of webpages and websites that are accessed over the internet |
| **Examples of use** | Email, online gaming, video calls, file transfers, the web | Visiting a news site, reading this page, online shopping |
| **Analogy** | The roads | The shops you drive to on those roads |

The web was invented by **Sir Tim Berners-Lee** in 1989. He also founded the **World Wide Web Consortium (W3C)**, which still looks after web standards today.

***

## Web Browsers

A **web browser** is an application used to access and display webpages on the World Wide Web. The browser downloads the HTML, CSS and images for a page and turns them into the page you see.

Common web browsers include:

| Browser | Made By | Engine |
|---|---|---|
| **Google Chrome** | Google | Blink |
| **Microsoft Edge** | Microsoft | Blink |
| **Mozilla Firefox** | Mozilla | Gecko |
| **Safari** | Apple | WebKit |
| **Opera** | Opera | Blink |
| **Brave** | Brave Software | Blink |

The **engine** is the part of the browser that reads the code and draws the page. Browsers with different engines can display the same page slightly differently. This is why websites should be tested in **more than one browser**.

!!! note "Browser Versions"
    Browsers are updated regularly, and older versions may not support newer HTML and CSS features. People do not always update their browser straight away, so a page can look different for two people using the same browser. Testing across **browsers and browser versions** helps make sure everyone gets a working page.

You can check which version of a browser you are using from its **About** page, for example `Settings` then `About Chrome` in Google Chrome.

***

## Web Servers

A **web server** is a computer that stores website files and sends them to browsers when they are requested. It is switched on and connected to the internet all the time, so the website is always available.

When you visit a website:

1. You type an address into the browser (or click a link)
2. The browser sends a **request** to the web server for that page
3. The web server finds the file (for example `index.html`) and sends it back as a **response**
4. The browser reads the HTML, then requests any other files the page needs, such as CSS files and images
5. The browser displays the finished page

Putting your website files onto a web server so other people can view them is called **publishing** or **deploying** a website. Companies that rent out space on web servers are called **web hosts**.

***

## Web Addresses (URLs)

Every webpage has an address called a **URL** (Uniform Resource Locator).

```
https://www.example.com/about.html
```

| Part | Example | Meaning |
|---|---|---|
| **Protocol** | `https://` | The set of rules used to transfer the page |
| **Domain name** | `www.example.com` | The name of the website (points to the web server) |
| **Path** | `/about.html` | The file being requested on the server |

If a URL does not name a file, for example `https://www.example.com/`, the web server sends the **`index.html`** file by default. This is why the home page of a website is always named `index.html`.

***

## HTTP and HTTPS

**HTTP** (HyperText Transfer Protocol) is the set of rules browsers and web servers use to send webpages to each other.

**HTTPS** is the **secure** version of HTTP. The **S** stands for **Secure**. HTTPS encrypts (scrambles) the information sent between the browser and the server, so other people cannot read or change it along the way.

You can tell a site is using HTTPS because:

- the address starts with `https://`
- the browser shows a **padlock** icon (or a similar "secure" icon) next to the address

Modern websites should always use HTTPS, especially when visitors type information into a form. Many browsers warn visitors with a **Not Secure** message when a site uses plain HTTP.

---

## Summary

- The internet is the network; the World Wide Web is the websites accessed over it
- Web browsers such as Chrome, Edge, Firefox and Safari are used to access the web
- Different browsers and browser versions can display pages differently, so test in more than one
- Web servers store website files and send them to browsers on request
- A URL is made up of a protocol, a domain name and a path
- `index.html` is the default page a server sends
- HTTPS is the secure, encrypted version of HTTP and shows a padlock in the browser
