import "./About.css";
import Avatar from "../../assets/Avatar.png";
const About = () => {
  return (
    <section className="about" id="about-section">
      <div className="about__container">
        <img src={Avatar} className="about__avatar-image" alt="Author" />
        <div className="about__text">
          <h2 className="about__text-author">About the author</h2>
          <p className="about__text-bio">
            Hey friends, my name is Anthony Law & I'm a full stack software
            engineer. My current coding languages include React, JavaScript,
            HTML, CSS, Node, & Express.
            <br></br>
            <br></br>My work history was in the hospitality industry, lastly as
            a bar manager. About a year or more ago I decided to leave & try
            something new. I started learning to code at TripleTen bootcamp.
            Where I've learned thorough theory and project's how to handle a
            different number of programming tasks. I'm looking to hone my skills
            further as well as perfect & build upon my current knowledge. I'd
            love to work with you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
