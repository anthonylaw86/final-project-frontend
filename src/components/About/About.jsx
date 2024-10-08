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
            I am a passionate and adaptable Full Stack Software Engineer
            transitioning from a diverse background in hospitality and retail
            management to the world of software development. With hands-on
            experience in the MERN stack, JavaScript, and modern tools like
            React, Node.js, and Vite, I have honed my ability to build
            user-friendly, efficient, and secure software solutions.
            <br></br>
            <br></br>With a solid foundation in software engineering principles
            from my Full Stack Bootcamp at TripleTen, I am excited to bring my
            strong problem-solving skills, creativity, and collaborative mindset
            to a team that values innovation and continuous growth. I am open to
            new opportunities and challenges where I can make an impact by
            combining my technical skills and customer-focused approach.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
