// Portal data: site + tool cards rendered by build/index.html.
window.SITES_DATA = {
    "courses": [
        { "id": "cert3-in-it", "label": "Cert 3 in IT", "fullname": "Certificate III in Information Technology" },
        { "id": "diploma-of-it", "label": "Diploma of IT", "fullname": "Diploma of Information Technology" },
        { "id": "short-courses", "label": "Short Courses", "fullname": "Kangan Short Courses" }
    ],
    "sites": [
        {
            "href": "/python-edison",
            "img": "./_assets/sites/edison-plugged-50.jpg",
            "title": "Python - Edison",
            "description": "Introduction to Python programming through structured, hands-on activities using the Edison robot.",
            "courses": ["cert3-in-it"],
            "disabled": true
        },
        {
            "href": "/design",
            "img": "./_assets/sites/tinkercad-buttonbox.png",
            "title": "Design Thinking",
            "description": "Explore human-centered design principles, ideation, techniques, and the end-to-end design process.",
            "courses": ["cert3-in-it"]
        },
        {
            "href": "/htmlcss",
            "img": "./_assets/sites/build-simple-webpages.png",
            "title": "Build Simple Webpages",
            "description": "Introduction to HTML focused through building, editing, and linking webpages into a complete website.",
            "courses": ["cert3-in-it"]
        },
        {
            "href": "/microbit",
            "img": "./_assets/sites/microbit.png",
            "title": "Micro:bit",
            "description": "Introduction to Programming via Python and Micro:bits",
            "courses": ["cert3-in-it"]
        },
        {
            "href": "/build-advanced-interfaces",
            "img": "./_assets/sites/build-advanced-interfaces.png",
            "title": "Build Advanced Interfaces",
            "description": "Build modern web applications with HTML, CSS, JavaScript, Next.js, and AI-assisted development tools.",
            "courses": ["diploma-of-it"]
        },
        {
            "href": "/hardware-os",
            "img": "./_assets/sites/hardware-os.png",
            "title": "Hardware & OS",
            "description": "Understand computer hardware components, operating systems, and how they work together.",
            "courses": ["cert3-in-it"]
        },
        {
            "href": "/version-control",
            "img": "./_assets/sites/version-control.png",
            "title": "Version Control",
            "description": "Learn Git and version control workflows through the VS Code interface.",
            "courses": ["diploma-of-it"]
        },
        {
            "href": "/ai-tools",
            "img": "./_assets/sites/ai-tools.png",
            "title": "AI-Assisted Development",
            "description": "Use AI chatbots and agents to plan, build, and debug software effectively.",
            "courses": ["diploma-of-it"]
        },
        {
            "href": "/data-handling",
            "img": "./_assets/sites/data-handling.png",
            "title": "Data Handling",
            "description": "Short Course in data handling and cleaning.  What's beyond basic Excel?",
            "courses": ["short-courses"]
        },
        {
            "href": "/database-and-api",
            "img": "./_assets/sites/database-api.png",
            "title": "Database and API",
            "description": "Databases and API.  PostGres, Supabase, FastAPI and SQL",
            "courses": ["diploma-of-it"]
        },
        {
            "href": "/program-iot-devices",
            "img": "./_assets/sites/program-iot-devices.png",
            "title": "Program IoT Devices",
            "description": "Introduction to IoT concepts and Arduino programming through structured activities and hands-on exercises.",
            "courses": ["diploma-of-it"]
        }
    ]
};

// Tools live in the same file so the portal needs only one data script.
window.TOOLS_DATA = {
    "tools": [
        {
            "href": "./tools/code",
            "img": "./_assets/tools/code.svg",
            "title": "CodePad",
            "description": "In-browser HTML, CSS, and JavaScript editor with live preview, share links, and ZIP export."
        },
        {
            "href": "./tools/learn-terminal",
            "img": "./_assets/tools/learn-terminal.svg",
            "title": "Learn Terminal",
            "description": "Learn Linux commands in a guided in-browser terminal emulator."
        },
        {
            "href": "./tools/anigram",
            "img": "./_assets/tools/anigram.svg",
            "title": "Anigram",
            "description": "Design, animate, and export flowcharts directly in your browser."
        }
    ]
};
