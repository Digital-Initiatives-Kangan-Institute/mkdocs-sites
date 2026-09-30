# Publishing a Website

A website on your own computer can only be seen by you. **Publishing** (also called **deploying**) copies the website files onto a web server so anyone with an internet connection can visit it. This page covers web hosting, the **File Transfer Protocol (FTP)**, and **GitHub Pages**, and compares the two.

---

## Web Hosting

A **web host** is a company that provides space on a web server for websites, usually for a monthly or yearly fee. Examples include VentraIP, Crazy Domains, GoDaddy and Hostinger. Hosting plans usually include:

- storage space on a web server for the website files
- a way to upload files, usually **FTP** or a web-based **file manager**
- a **domain name** (or the option to connect one), such as `www.mybusiness.com.au`
- an **SSL certificate**, which lets the site use HTTPS

Technologies that can be used to publish a website include:

| Technology | Description |
|---|---|
| **FTP / SFTP client** | Software that uploads files from your computer to a web host's server |
| **Web host file manager** | A browser-based upload page in the web host's control panel (such as cPanel) |
| **GitHub Pages** | Free hosting for static websites stored in a GitHub repository |
| **Other static hosts** | Services such as Netlify and Cloudflare Pages, which publish websites from a repository or uploaded folder |
| **IDE extensions** | Extensions such as **SFTP** for VS Code, which upload files straight from the IDE |

***

## File Transfer Protocol (FTP)

**FTP** (File Transfer Protocol) is a standard set of rules for **transferring files between computers over a network**. In web development, its function is to **upload** website files from the developer's computer to the web server (and download them back if needed).

To connect to a server with FTP you need these details, which are supplied by the web host:

| Detail | Example |
|---|---|
| **Host** (server address) | `ftp.mybusiness.com.au` |
| **Username** | `mybusiness` |
| **Password** | A strong password supplied or set in the host's control panel |
| **Port** | `21` for FTP, `22` for SFTP |

### FTP Clients

An **FTP client** is an application used to connect to an FTP server. The most common is **FileZilla** (free). Others include **WinSCP** and **Cyberduck**.

An FTP client window is usually split in two:

- the **local site** (left): the files on your computer
- the **remote site** (right): the files on the web server

To upload a website with FileZilla:

1. Open FileZilla and enter the **Host**, **Username**, **Password** and **Port** in the **Quickconnect** bar, then click **Quickconnect**
2. In the **remote site** panel, open the folder the website must go in. Web hosts often call this `public_html`, `www` or `htdocs`.
3. In the **local site** panel, open your website folder
4. Select all your website files and folders (including the `images` folder) and drag them to the remote site panel
5. Wait for the transfers to finish, then visit your domain in a browser to check the site

Keep the **same folder structure** on the server as on your computer. If `images` is a folder next to `index.html` on your computer, it must be the same on the server, otherwise images will not load.

### FTP in an IDE

Many IDEs can be set up to upload files over FTP themselves, so the developer does not need a separate application. In VS Code, this is done with an extension such as **SFTP**: the connection details are saved in the project's settings, and files can be uploaded with a right-click, or automatically each time they are saved.

### FTP Security

Standard FTP sends everything, **including your username and password**, as plain text. Anyone monitoring the network could read them. For this reason, secure versions are used instead wherever possible:

| Protocol | Security |
|---|---|
| **FTP** | Not encrypted. Avoid where possible. |
| **FTPS** | FTP with encryption (SSL/TLS) added |
| **SFTP** | SSH File Transfer Protocol. Encrypted. The most common secure option. |

Good practices for access and passwords:

- use a **strong, unique password** for every FTP account
- never share login details, or save them in your website files or code comments
- use SFTP or FTPS rather than plain FTP
- only give FTP access to people who need it

***

## GitHub Pages

**GitHub** is a platform for storing code in **repositories**, with **version control** built in: every change is saved as a **commit**, so you can see what changed, when, and go back to an earlier version.

**GitHub Pages** is a free GitHub feature that publishes the files in a repository as a website, at an address like:

```
https://username.github.io/repository-name/
```

GitHub Pages hosts **static** websites: HTML, CSS and image files. It is ideal for simple websites, portfolios and project documentation.

Publishing with GitHub Pages involves:

1. Creating a **public** repository
2. Uploading the website files to the repository, keeping the folder structure
3. Turning on GitHub Pages in the repository's **Settings**, under **Pages**, and choosing the `main` branch
4. Waiting for the deployment to finish in the **Actions** tab, then visiting the site's address

For step by step instructions with screenshots, see [Deploying to GitHub Pages](deployment-github.md).

When files are changed and committed in the repository, GitHub Pages automatically re-publishes the site.

***

## GitHub Pages vs FTP

| | GitHub Pages | FTP to a Web Host |
|---|---|---|
| **Cost** | Free | Hosting plan fee, usually monthly or yearly |
| **Setup** | Create a repository and turn on Pages | Buy hosting, get FTP details, install an FTP client |
| **Security** | HTTPS provided automatically. Uploads happen through your GitHub login in the browser. | HTTPS needs an SSL certificate from the host. Plain FTP sends passwords unencrypted; SFTP or FTPS is needed for security. |
| **Version control** | Built in. Every change is tracked, and earlier versions can be restored. | None. Uploading a file overwrites the old version unless you keep your own backups. |
| **Publishing changes** | Automatic when changes are committed | Each changed file must be uploaded manually |
| **Collaboration** | Several developers can work on the same repository and review changes | Developers share FTP logins, and can overwrite each other's work |
| **Web address** | `username.github.io/repository` by default. A custom domain can be added. | Your own domain name |
| **What it can host** | Static websites only (HTML, CSS, images) | Static websites, plus server-side programs and databases, depending on the plan. For example, a contact form that actually sends emails. |
| **Server control** | None. GitHub manages the server. | More control over server settings and files |
| **Visibility of code** | On free accounts the repository must be public, so anyone can see the code | Only people with FTP access can see the files on the server |

In short: **GitHub Pages** is free, secure by default, and tracks every version, making it ideal for simple static sites. **FTP hosting** costs money and needs more care with security, but gives more control and can run features that need a server.

---

## Summary

- Publishing copies website files onto a web server so anyone can visit the site
- FTP transfers files from the developer's computer to a web server, using a host, username, password and port
- FTP clients such as FileZilla show local files and remote files side by side; IDE extensions can also upload over FTP
- Plain FTP is not encrypted, so SFTP or FTPS should be used, with strong passwords kept out of code
- GitHub Pages publishes a repository as a free, HTTPS website with built-in version control
- Keep the same folder structure on the server as on your computer

### Activity - Publish Your Website

[Attempt Activity 13 - Publish Your Website](../tasks/task-13-publish-website.md){.md-button}
