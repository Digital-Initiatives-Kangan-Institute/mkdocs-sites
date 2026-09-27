# Legislation and Procedures

Websites are public, so the people who build them need to follow the law. This page outlines the Australian legislation that applies to web content, and the kinds of organisational procedures web developers follow at work.

!!! note
    This page is a general overview for web developers, not legal advice. Organisations usually have policies that explain how each law applies to their work.

---

## Legislation for Web Content

| Legislation | What it covers | What it means for a website |
|---|---|---|
| **Privacy Act 1988** (Cth) and the **Australian Privacy Principles (APPs)** | How personal information (names, emails, phone numbers, addresses) is collected, used, stored and shared | Only collect the information you need. Explain what is collected and why, usually in a **privacy policy**. Keep collected information secure. |
| **Copyright Act 1968** (Cth) | Protects creators' work, including text, images, photos, videos, music, fonts and code | Only use content you own, have permission to use, or that is licensed for your use. Do not copy images from search results. Credit creators where required. |
| **Disability Discrimination Act 1992** (Cth) | Makes it unlawful to discriminate against people with disability, including through inaccessible services | Websites should be accessible. Following **WCAG** is the accepted way to show a site is accessible (see [Accessibility](accessibility.md)). |
| **Spam Act 2003** (Cth) | Commercial electronic messages such as marketing emails and SMS | Only send marketing messages to people who have agreed to receive them. Messages must identify the sender and include a way to unsubscribe. Forms that sign people up must ask for consent. |
| **Competition and Consumer Act 2010** (Cth), including the **Australian Consumer Law** | Fair trading and consumer protection | Website content must not be false or misleading, for example prices, product claims or reviews. |
| **Online Safety Act 2021** (Cth) | Harmful online content, overseen by the **eSafety Commissioner** | Sites that host user content must deal with harmful or abusive material. |

State and territory laws, such as privacy and anti-discrimination laws, can also apply.

***

## Copyright and Images

Copyright is the law web developers run into most often, because websites use so many images.

- A photo is protected by copyright **as soon as it is taken**. It does not need a © symbol.
- Finding an image through a search engine does **not** mean you can use it.
- Use images that the **client supplies**, that you create yourself, or that come from a site that allows reuse, such as royalty-free stock photo sites (for example **Unsplash** or **Pexels**). Always read the licence.
- **Creative Commons** licences allow reuse under certain conditions, such as crediting the creator.
- Your own website content is also protected. A footer line such as `© 2026 Business Name` reminds visitors who owns it.

***

## Privacy and Forms

Any form that collects a name, email or message is collecting **personal information**.

- Only ask for information the client actually needs
- Make sure the site uses **HTTPS** so information typed into forms is encrypted (see [How the Web Works](how-the-web-works.md#http-and-https))
- Never publish personal information about staff or customers without their permission
- Never put **passwords**, private notes or personal details in your HTML or comments. Anyone can view a page's source code.

***

## Organisational Procedures

Organisations have their own **procedures** (the agreed way work is done) for building websites. Common examples include:

| Procedure | Example |
|---|---|
| **Approved tools** | The IDE, extensions and hosting the team uses, and confirming your choice with a supervisor |
| **Style guides and templates** | Using the organisation's or client's logo, colours, fonts and page templates |
| **File naming and folder structure** | Lowercase names, hyphens instead of spaces, images in an `images` folder |
| **Client sign-off** | Getting approval of the plan before building, and of the finished site before it goes live |
| **Version control and backups** | Storing code in a repository such as **GitHub** so changes are tracked and nothing is lost |
| **Testing** | Testing in multiple browsers, checking accessibility, and recording results before release |
| **Feedback and amendments** | Recording client and tester feedback, the changes made, and the date |
| **Security** | Using strong passwords, never sharing login details, and keeping credentials out of code |
| **Escalation** | Passing work outside your role to the right person, for example a senior developer building a working form |

As a junior developer, part of your role is knowing what you are responsible for, and checking with your supervisor when something is outside that.

---

## Summary

- The Privacy Act 1988 controls how personal information collected through a website is handled
- The Copyright Act 1968 means you must have the right to use every image and piece of content
- The Disability Discrimination Act 1992 means websites should be accessible, which is shown by meeting WCAG
- The Spam Act 2003 controls marketing emails and messages
- The Australian Consumer Law means website content must not be misleading
- Organisational procedures cover tools, templates, naming, sign-off, backups, testing, feedback and security
