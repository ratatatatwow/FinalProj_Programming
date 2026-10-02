/* =====================================================
   PERSONAL WEBSITE
   JAVASCRIPT + OBJECT-ORIENTED PROGRAMMING
   ===================================================== */


/* =====================================================
   MAIN CLASS
   ===================================================== */

class PersonalSite {

    constructor() {

        this.year = new Date().getFullYear();

        this.initNavigation();

        this.renderSkills();

        this.renderProjects();

        this.initForm();

        this.setFooterYear();

    }


    /* =================================================
       NAVIGATION
       ================================================= */

    initNavigation() {

        const menuButton =
            document.querySelector(".menu-btn");

        const nav =
            document.querySelector(".nav");


        if (menuButton && nav) {

            menuButton.addEventListener(
                "click",
                () => {

                    nav.classList.toggle("open");

                }
            );


            nav.querySelectorAll("a")
                .forEach(link => {

                    link.addEventListener(
                        "click",
                        () => {

                            nav.classList.remove("open");

                        }
                    );

                });

        }

    }


    /* =================================================
       RENDER SKILLS
       ================================================= */

    renderSkills() {

        const grid =
            document.querySelector("#skillsGrid");


        if (!grid) {

            return;

        }


        const skills = [

            ["🎨", "Graphic Design"],

            ["🖥️", "HTML & CSS"],

            ["⚡", "JavaScript"],

            ["☕", "Java / OOP"],

            ["📱", "UI/UX Design"],

            ["✏️", "Drawing"],

            ["🎬", "Multimedia"],

            ["🤝", "Teamwork"]

        ];


        grid.innerHTML = skills
            .map(([icon, name]) => {

                return `

                    <article class="skill">

                        <span class="skill-icon">
                            ${icon}
                        </span>

                        <strong>
                            ${name}
                        </strong>

                    </article>

                `;

            })
            .join("");

    }


    /* =================================================
       RENDER PROJECTS
       ================================================= */

    renderProjects() {

        const grid =
            document.querySelector("#projectGrid");


        if (!grid) {

            return;

        }


        const projects = [

    new Project(
        "01",
        "Pop Vault",
        "Java • Object-Oriented Programming",
        "A collection and wishlist management system designed for organizing collectibles, tracking items, and managing duplicate pieces using Java and OOP concepts.",
        "🎀",
        ["Java", "Swing", "OOP"]
    ),

    new Project(
        "02",
        "CoreTime Fitness",
        "Management System • CRUD",
        "A fitness management system designed to organize and manage records through CRUD operations, providing a simple and structured interface for managing fitness-related information.",
        "💪",
        ["CRUD", "JavaScript", "Management System"]
    ),

    new Project(
        "03",
        "Artistry Vision",
        "Web Design • Senior High School",
        "A creative website design project developed using Wix, focusing on visual presentation, layout, creativity, and user-friendly web design.",
        "🎨",
        ["Wix", "Web Design", "Creativity"]
    )

];



        grid.innerHTML = projects

            .map(project => {

                return project.toHTML();

            })

            .join("");

    }

    

    /* =================================================
       CONTACT FORM
       ================================================= */

    initForm() {

        const form =
            document.querySelector("#contactForm");


        if (!form) {

            return;

        }


        new FormValidator(form);

    }


    /* =================================================
       FOOTER YEAR
       ================================================= */

    setFooterYear() {

        document
            .querySelectorAll("footer span")
            .forEach(element => {

                element.textContent =
                    `© ${this.year} Jocelyn De Castro`;

            });

    }

}



/* =====================================================
   PROJECT CLASS
   =====================================================

   This demonstrates:
   - Classes
   - Objects
   - Constructor
   - Properties
   - Methods
   ===================================================== */

class Project {


    constructor(
        number,
        title,
        category,
        description,
        icon,
        technologies
    ) {

        this.number = number;

        this.title = title;

        this.category = category;

        this.description = description;

        this.icon = icon;

        this.technologies = technologies;

    }


    toHTML() {

        let visualClass;


        if (this.number === "01") {

            visualClass = "one";

        }

        else if (this.number === "02") {

            visualClass = "two";

        }

        else {

            visualClass = "three";

        }


        const tags =
            this.technologies

                .map(technology => {

                    return `
                        <span class="tech">
                            ${technology}
                        </span>
                    `;

                })

                .join("");


        return `

            <article class="project-card">

                <div class="project-visual ${visualClass}">

                    <span class="project-number">

                        PROJECT ${this.number}

                    </span>

                    <span>
                        ${this.icon}
                    </span>

                </div>


                <div class="project-body">

                    <span class="tag">

                        ${this.category.toUpperCase()}

                    </span>


                    <h2>

                        ${this.title}

                    </h2>


                    <p>

                        ${this.description}

                    </p>


                    <div class="project-footer">

                        ${tags}

                    </div>

                </div>

            </article>

        `;

    }

}



/* =====================================================
   FORM VALIDATOR CLASS
   =====================================================

   Handles:
   - Form validation
   - Error messages
   - Email validation
   - Success message
   ===================================================== */

class FormValidator {


    constructor(form) {

        this.form = form;


        this.status =
            document.querySelector("#formStatus");


        this.fields = {


            name: {

                input:
                    form.querySelector("#name"),

                error:
                    form.querySelector("#nameError"),

                message:
                    "Please enter your name."

            },


            email: {

                input:
                    form.querySelector("#email"),

                error:
                    form.querySelector("#emailError"),

                message:
                    "Please enter a valid email address."

            },


            subject: {

                input:
                    form.querySelector("#subject"),

                error:
                    form.querySelector("#subjectError"),

                message:
                    "Please enter a subject."

            },


            message: {

                input:
                    form.querySelector("#message"),

                error:
                    form.querySelector("#messageError"),

                message:
                    "Please write a message."

            }

        };


        this.bindEvents();

    }



    /* =================================================
       EVENTS
       ================================================= */

    bindEvents() {


        this.form.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                this.clearStatus();


                const isValid =
                    this.validateAll();


                if (isValid) {


                    this.status.textContent =
                        "Message checked! ♡ In a real website, this would now be sent.";


                    this.status.className =
                        "form-status success";


                    this.form.reset();

                }


                else {


                    this.status.textContent =
                        "Almost there! Please fix the highlighted fields.";


                    this.status.className =
                        "form-status fail";

                }

            }
        );


        Object.values(this.fields)
            .forEach(field => {


                field.input.addEventListener(
                    "input",
                    () => {

                        this.validateField(field);

                    }
                );


            });

    }



    /* =================================================
       VALIDATE EVERYTHING
       ================================================= */

    validateAll() {

        return Object
            .values(this.fields)
            .every(field => {

                return this.validateField(field);

            });

    }



    /* =================================================
       VALIDATE ONE FIELD
       ================================================= */

    validateField(field) {

        const value =
            field.input.value.trim();


        let valid =
            value.length > 0;


        /* EMAIL VALIDATION */

        if (
            field.input.type === "email"
            &&
            valid
        ) {

            valid =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(value);

        }


        /* ADD / REMOVE ERROR */

        field.input.classList.toggle(
            "invalid",
            !valid
        );


        field.error.textContent =
            valid
                ? ""
                : field.message;


        return valid;

    }

    


    /* =================================================
       CLEAR FORM STATUS
       ================================================= */

    clearStatus() {

        this.status.textContent = "";

        this.status.className =
            "form-status";

    }

}



/* =====================================================
   START WEBSITE
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        new PersonalSite();

    }
);
