import React from 'react';
import '../../App.css'

function Homepage() {
  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>Saoirse Seeber (she/her)</h1>
        {/* <div>
          <p>Email: <a href="mailto:seebersaoirse@gmail.com">seebersaoirse@gmail.com</a></p>
          <p>Mobile: +353-87-971-9968</p>
        </div> */}
      </header>

      {/* Summary */}
      <section className="summary">
        <h2>Summary</h2>
        <p>Experienced software engineer with nearly half a decade of professional experience in driving innovation. Proficient in quickly adapting to new technologies, driven to create the highest quality products & a desire for constant growth.</p>
      </section>

      {/* Work Experience */}
      <section className="experience">
        <h2>Work Experience</h2>

        <div className="job">
          <h3>General Motors Ireland</h3>
          <p>Dublin, Ireland [Hybrid]</p>
          <p>Full Stack Engineer | Nov 2023 - Present</p>
          <ul>
            <li>Front-end, back-end & dev-ops engineer on a team of approx. a dozen developers/QA team members. Responsible for the creation & maintenance of internal tools to ensure business success.</li>
            <li><strong>AutoQA Dashboard:</strong> Led development of a dashboard, tracking the progress of automating QA processes. Enhanced data scrubbing & streamlined environment promotion using CI/CD pipelines. <em>Technologies: React, .Net, Azure DevOps.</em></li>
            <li><strong>Application Monitoring:</strong> Developed an application to monitor GM applications & improve outage management. Acted as Scrum Lead when needed to ensure adherence to Agile practices. <em>Technologies: React, .Net</em></li>
          </ul>
        </div>

        <div className="job">
          <p>Immersive Software Developer | July 2021 - Nov 2023</p>
          <ul>
            <li>At GM’s internal startup, I collaborated with a small group of developers and artists on various Proof of Concepts (POCs), leveraging diverse technologies.</li>
            <li><strong>Metahuman Chatbot:</strong> Created a Character Interaction System for GM’s chatbot. This involved a voice interaction system powered by AI to determine the emotion users were feeling and modify the interaction to match. <em>Technologies used: Unreal Engine, Python, JavaScript.</em></li>
            <li><strong>Process Automation:</strong> Developed automation tools to streamline data management & enhance workflows, saving over 100 hours per visualizer. <em>Technologies: C++, Unreal Engine, Python.</em></li>
            <li><strong>Tool Development:</strong> Partnered with design & marketing teams to build the Visualiser Toolkit, including Maya plugins for custom stitching & visual tweaks. <em>Technologies: Python C++, Maya, Deltagen, Unreal Engine.</em></li>
            <li><strong>POC Development:</strong> Developed various POCs, including a digital brochure (Unreal Engine) & a WebGL video conferencing application for Hololens (Unity, C#), demonstrating innovative solutions to meet client needs.</li>
          </ul>
        </div>

        <div className="job">
          <p>Immersive Software Apprentice | July 2020 - June 2021</p>
          <ul>
            <li>Assisted in the development of interactive tools & systems. Gained experience in various programming languages & technologies, contributing to successful project outcomes.</li>
            <li><strong>Panoramic Environment Template:</strong> A website which combined various panoramic images with interactive hot spots to construct an interactive environment. <em>Technologies: JavaScript, HTML, WebGL.</em></li>
            <li><strong>Metadata implementation:</strong> Led creation of a tool to extract design files data & apply as metadata to JT files. <em>Technologies: C++.</em></li>
          </ul>
        </div>

        <div className="job">
          <h3>Self-employed</h3>
          <p>Dublin, Ireland</p>
          <p>Music Teacher | Aug 2013 - June 2020</p>
          <ul>
            <li>Provided music education to diverse groups of students, developing lesson plans, motivating learners, & organizing events to showcase student achievements.</li>
          </ul>
        </div>
      </section>

      {/* Education */}
      <section className="education">
        <h2>Education</h2>
        <div className="degree">
          <h3>Trinity College Dublin</h3>
          <p>MSc in Interactive Digital Media (2.1) | Aug 2018 -- Nov 2019</p>
        </div>
        <div className="degree">
          <h3>University College Dublin</h3>
          <p>BMus | Aug 2013 -- Aug 2016</p>
        </div>
      </section>

      {/* Programming Skills */}
      <section className="skills">
        <h2>Programming Skills</h2>
        <ul>
          <li><strong>Languages:</strong> Python, C#, C++, JavaScript, HTML, CSS, Unreal Blueprints</li>
          <li><strong>Technologies:</strong> React, .NET, Azure DevOps, Visual Studio, VS Code, Git, Insomnia, pgadmin, Unreal Engine, Unity</li>
        </ul>
      </section>

      {/* Hobbies */}
      <section className="hobbies">
        <h2>Hobbies</h2>
        <ul>
          <li><strong>Designing & Building Game Prototypes:</strong> Enjoy conceptualizing & creating game prototypes.</li>
          <li><strong>Music Technology:</strong> Passionate for using Digital Audio Workstations, synthesis & Virtual Studio Technologies.</li>
          <li><strong>Organizing Concerts:</strong> Planning, coordinating, & executing events, handling logistics, & managing performers.</li>
        </ul>
      </section>
    </div>
  );
}

export default Homepage;