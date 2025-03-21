import React from 'react';
import './styles/about.css';

const About = () => {
    return (
        <div className="flexbox">
            <div className="flext">
                <div className="flexmt">
                    <h1>About page</h1>
                </div>
            </div>
            <div className="flexg">
                <div className="img-container"><img className="img" src="imgqvor.png" alt="Yavor Penev" /></div>
                <div className="flexm">
                    <p>The first highly appreciated developer we must thank for this endeavour is of course Mr. Yavor Penev.
                        Probably the most organized of the team (which isn't saying too much to be fair), he has been the
                        primary extrinsic motivation for most of the remaining team. As the leading work didtribution
                        manager, he has set upon himself the task of 'careening' the team towards its goals, handing out
                        assignment after assignemt like nobody's business (to much of the less motivated members of the
                        team's dismay). This isn't to say that that is the only thing he is responsible for. As the lead
                        consulting manager of the team, every speculative decision that is taken during the development
                        process must pass through the 'quality check' phase, where through a highly democratic voting system
                        the team reaches a conclusion, which may or may not be every bit as conclusive as the Bulgarian
                        parliament(especially if somebody's behind on a commit or a dozen so). Mr. Penev's work isn't always
                        focused on purely administrative tasks, as he has also highly influenced the final outcome of the
                        main page, most notably the header and footer, ensuring that they are a balsam for any user's eyes.
                        The contents of the sliding menus have also been handcrafted by our hardworking developer, who is
                        the one to thank (or ultimately blame) for their organization and appearance. Acting like the
                        'Jack-Of-All-Trades', Mr. Yavor has also taken the time to assist the other part of the team with
                        the database, which is oblviously a core part of this marvel.</p>
                </div>
            </div>
            <div className="flexg">
                <div className="img-container"><img className="img" src="imgvelinov.png" alt="Kristian Velinov" /></div>
                <div className="flexm">
                    <p>Yet another developer to thank is Mr Kristian Velinov. As the main React developer, it comes to
                        nobody's surprise, that some rather 'niche' (but very neat) functionalities have been lovingly (or
                        angrily at times) crafted for the viewer's sake. Such being the theme changer button, carousel
                        implementation, design and animation, as well as the overall website theme presets and design
                        patters, that have been determined in conjunction with the aforementioned Mr. Penev. Mr Velinov is
                        responsible for the overall webite idea and grand appearance, relating to which we have done our
                        best to work with and keep unchanged throughout the entirety of the project. Mr. Velinov has also
                        taken the unnoficial bug testing and removing responsibility sadly not due to his own will, rather
                        because of the slightly frequent occurance of insignifigant backend changes and reorganizations
                        leading to massive issues with his code specifically. These hardships have also almost caused a
                        laptop-sized hole in Mr. Kristian's wall. Our caring developer (ironically proceeding to speak about
                        himself in third person) has also taken the time to personally handcraft the contents of this very
                        page, desperately hoping for somebody to take the time and read through it all. Perhaps if there was
                        a monetary reward for reading through this entire page, would people read it...</p>
                </div>
            </div>
            <div className="flexg">
                <div className="img-container"><img className="img" src="imgmih.png" alt="Kristiyan Mihailov" /></div>
                <div className="flexm">
                    <p>The third member of the team is Mr. Kristiyan Mihailov. As yet another key developer, he is
                        responsible for everything that is behind an end, or in other words, the backend. Through courage,
                        determination, valor and might, he has been able to learn to fight the vicious menace that is mySQL,
                        Node.js and Express.js - an undertaking that nobody wished to fulfill exept himself! His work has
                        been of paramount importance to the entire project, as his web of work spans from the very extensive
                        database, containing every piece of information that our hardworking previous two members have
                        ensured that it reaches the viewer's eyes, much to their contént. Yet another fruit of his labour
                        are
                        the two 'Profile' and 'Login'/'Signup' pages, gruellingly built up from the ground to serve our
                        users personalized and customizable options to choose from. Yet another feature that has been
                        brought to life from Mr. Mihailov is his venture into the realm of organizing the entire project
                        and its folders, much to our React developer's dismay. Sadly however, it seems he Mr. Kristiyan has
                        submitted to
                        conform to the team, as it left a lasting mark on various other members' sanity and mental health.
                        Let's just hope he doesn't touch anything again, or a preemtive brick might be hurled his way.
                    </p>
                </div>
            </div>
            <div className="flexg">
                <div className="img-container"><img className="img" src="img77.png" alt="Bobi Stoynev" /></div>
                <div className="flexm">
                    <p>As the fourth member of the team Mr. bobi77 'Stoynev' is yet another vital cog in the machine that is
                        this project. Despite being the rather inert and busy member, he has managed to spare us a bit of
                        his time to produce some stuff truly magnificent to the eye! The 'stuff' in question being the FAQ
                        (pronounced [Fà-Kíuu]) page, as our thoughts and examinations have led us to believe, that most
                        people don't know how to computer, let alone navigate even our intuitive design and layout. Mr.
                        Stoynev is also responsible for the thorough github description, which explains our project in its
                        core. Bobi77, I failed to mention before, is also in his primary time an expert basketball player,
                        not due to coincidence, but because of the plain fact, that he is also the sole nephew of
                        Vezenkov!!! He is also <b>THE</b> basketballer, who is most frequently chosen by our beloved Mrs.
                        Basheva, which is an achievement in itself. Autographs from 13:50 to 14:10 GMT, Mondays in Бюфет №9
                        only. Payment in advance</p>
                </div>
            </div>
            <div className="flexg">
                <div className="img-container"><img className="img" src="imgdein.png" alt="Dein" /></div>
                <div className="flexm">
                    <p>Last but not least comes our equally cherished developer Mr Dein. He is the one responsible for this
                        very page skeleton design, as well as the image insertions. Much like our main team coordinator Mr.
                        Yavor Penev, Mr. Dein is active both frontend and backend, as most dropdown menus have been inserted
                        according to his work. Behind the front, he has also been of assistance to our main backend
                        developer - Mr. Mihailov. Mr. Dein specialises in the languages of node.js and express.js,
                        originating from Mr. Dein's own request to study and learn them. He probably regrets it now. Being
                        yet another talented sportsman, he is a vigorous supporter of Bulgarian football, as he himself has
                        experience in it too. Autographs from 24:10 to 24:15, PMT, Timor Leste.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
