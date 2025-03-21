import React, { useState } from 'react';
import './styles/faq.css';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div>
            <h1 className="zaglavie">- Frequently Asked Questions -</h1>
            <div className="section">
                <div className="question" onClick={() => toggleAnswer(0)}> ⮞ How to create an account in the site?</div>
                {activeIndex === 0 && (
                    <div className="answer">
                        To create an account on the website, click on the "Sign Up" or "Create Account" button, usually located at the top-right corner of the homepage. You will be prompted to provide your username, email address, and a password. Some websites may also require you to confirm your email address by clicking a verification link sent to your inbox. Once your account is created, you can log in and start contributing to the website.
                    </div>
                )}
            </div>
            <div className="section">
                <div className="question" onClick={() => toggleAnswer(1)}> ⮞ How do I log in to my account?</div>
                {activeIndex === 1 && (
                    <div className="answer">
                        After you create an account and log in, you can edit articles by navigating to the page you want to modify. At the top of the article, you will see an "Edit" button (or a similar option). Clicking on it will open the article in an editing interface, where you can modify the text, add new information, or correct any errors. Once you've made the necessary changes, you can preview them and save the edited version. It's important to follow the site’s guidelines on formatting and citations when editing content.
                    </div>
                )}
            </div>
            <div className="section">
                <div className="question" onClick={() => toggleAnswer(2)}> ⮞ How to use the loan calculator?</div>
                {activeIndex === 2 && (
                    <div className="answer">
                        When adding new information to an article, ensure that it is both accurate and verifiable. The content you add should be backed by reliable sources such as books, articles, or official documents. It’s important to follow the site’s content policies, which typically require neutrality, proper citation of sources, and adherence to specific formatting rules. Avoid adding personal opinions or unverified facts. If you are unsure about a topic, it's better to research it thoroughly or seek guidance from more experienced contributors.
                    </div>
                )}
            </div>
            <div className="section">
                <div className="question" onClick={() => toggleAnswer(3)}> ⮞ How to change the theme?</div>
                {activeIndex === 3 && (
                    <div className="answer">
                        Adding sources to an article involves citing reliable references that support the information you provide. Most websites have a citation format that you should follow. You can insert citations by using the site’s editor tools, which typically include options for inline citations. To cite a source, you might need to add a reference tag in the text (e.g., [1], [2]) and list the full citation in a separate reference section or bibliography at the end of the article. Using credible sources and properly formatted citations is essential to maintaining the quality and accuracy of the content.
                    </div>
                )}
            </div>
            <div className="section">
                <div className="question" onClick={() => toggleAnswer(4)}> ⮞ How to use the currency exchange calculator?</div>
                {activeIndex === 4 && (
                    <div className="answer">
                        If you notice a mistake in an article, you can correct it by editing the page. First, click the "Edit" button, locate the error, and make the necessary changes. Be sure to provide proper sources for any new information you add or modifications you make. If the mistake is minor, like a typo or formatting issue, you can fix it quickly. However, if the mistake involves factual errors or misleading information, it’s important to research the topic thoroughly before making the changes. If you're uncertain about a significant change, consider discussing it with other contributors on the article’s "Talk" page.
                    </div>
                )}
            </div>
            <div className="section">
                <div className="question" onClick={() => toggleAnswer(5)}> ⮞ How can I track changes in an article I'm interested in?</div>
                {activeIndex === 5 && (
                    <div className="answer">
                        To track changes in an article, you can use the "Watch" feature available on most platforms. By clicking the "Watch" button (often found at the top of the page), you’ll receive notifications whenever someone makes an edit to the article. These notifications may be sent via email or displayed in your user account. Tracking changes is useful for staying up to date with the content, ensuring that it remains accurate, and being alerted to any changes that may require your attention or review.
                    </div>
                )}
            </div>
            <div className="section">
                <div className="question" onClick={() => toggleAnswer(6)}> ⮞ How do I remove or modify information I’ve added?</div>
                {activeIndex === 6 && (
                    <div className="answer">
                        If you need to remove or modify the information you’ve added to an article, simply go back to the page and click the "Edit" button. In the editing interface, you can delete any unwanted content or adjust the existing information. After making your changes, be sure to preview the article to check for errors or inconsistencies. When you’re satisfied, save your edits. If you’ve added incorrect information, it’s important to provide an explanation or source for the changes in the "Edit Summary" field, so other users can understand why the modification was made.
                    </div>
                )}
            </div>
            <div className="section">
                <div className="question" onClick={() => toggleAnswer(7)}> ⮞ What should I do if an article has been vandalized?</div>
                {activeIndex === 7 && (
                    <div className="answer">
                        If you notice that an article has been vandalized (e.g., the content has been changed to nonsense or offensive material), the first thing you should do is attempt to revert the changes using the site’s "Undo" feature. This will restore the article to its previous version. If you're not able to undo the changes, or if the vandalism is more extensive, you can report the issue to the site administrators or moderators. They will typically investigate the situation and take appropriate action, such as blocking the user responsible for the vandalism and restoring the article to its original state.
                    </div>
                )}
            </div>
            <div className="section">
                <div className="question" onClick={() => toggleAnswer(8)}> ⮞ How can I suggest a new topic or article to be added?</div>
                {activeIndex === 8 && (
                    <div className="answer">
                        If you want to suggest a new article or topic, you should first search the site to make sure the subject doesn’t already exist. If a similar topic exists but could be expanded, you can contribute to that article instead. If the topic is entirely new, check if there is a "Create Article" or "Red Link" on the website. A red link indicates that an article doesn’t exist yet, and you can create it by clicking on it. Before creating a new article, it’s important to ensure that the topic is notable and has enough reliable sources to support its content.
                    </div>
                )}
            </div>
            <div className="section">
                <div className="question" onClick={() => toggleAnswer(9)}> ⮞ How can I leave a review about the site?</div>
                {activeIndex === 9 && (
                    <div className="answer">
                        Most websites like Wikipedia have built-in tools for editing tables and images. To add a table, you can use the site's editor to insert a table template or write the necessary HTML code for a custom table. When adding images, make sure the images are properly licensed for reuse or fall under fair use guidelines. You can upload the images to the platform and insert them into the article by using specific image tags. Be sure to include proper image captions and credit to the original source if applicable.
                    </div>
                )}
            </div>
        </div>
    );
};

export default FAQ;
