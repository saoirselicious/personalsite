import React from 'react';
import '../../App.css';
import { Button } from '@mui/material';
import { AzuredevopsOriginal, CplusplusPlain, CsharpLine, DotNetPlain, JavascriptOriginal, MayaOriginal, PythonOriginal, ReactOriginal, UnrealengineOriginal, UnityPlain, TypescriptOriginal, CplusplusOriginal } from 'devicons-react';
import data from './sample.json'; // Assuming the JSON is in the same folder

function CV() {
  const { summary, work_experience, education, programming_skills, hobbies } = data;

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>Saoirse Seeber (she/her)</h1>
        {/* Email and Mobile can be added if needed */}
      </header>

      {/* Summary */}
      <section className="summary">
        <h2>Summary</h2>
        <p>{summary}</p>
      </section>

      {/* Work Experience */}
      <section className="experience">
        <h2>Work Experience</h2>
        {work_experience.map((job, index) => (
          <div className="job" key={index}>
            <h3>{job.company}</h3>
            <p>{job.location}</p>
            <p>{job.position} | {job.dates}</p>
            <ul>
              {job.projects?.map((project, i) => (
                <li key={i}>
                  <strong>{project.name}:</strong> {project.description}
                  <em>Technologies: {project.technologies.join(', ')}.</em>
                  {project.technologies.includes('Azure DevOps') && <AzuredevopsOriginal />}
                  {project.technologies.includes('C++') && <CplusplusPlain />}
                  {project.technologies.includes('C#') && <CsharpLine />}
                  {project.technologies.includes('.Net') && <DotNetPlain />}
                  {project.technologies.includes('Maya') && <MayaOriginal />}
                  {project.technologies.includes('Javascript') || project.technologies.includes('JavaScript') && <JavascriptOriginal />}
                  {project.technologies.includes('Python') && <PythonOriginal />}
                  {project.technologies.includes('React') && <ReactOriginal />}
                  {project.technologies.includes('Unreal Engine') && <UnrealengineOriginal />}
                  {project.technologies.includes('Unity') && <UnityPlain />}
                  {project.technologies.includes('Typescript') && <TypescriptOriginal />}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="education">
        <h2>Education</h2>
        {education.map((degree, index) => (
          <div className="degree" key={index}>
            <h3>{degree.institution}</h3>
            <p>{degree.degree} | {degree.dates}</p>
          </div>
        ))}
      </section>

      {/* Programming Skills */}
      <section className="skills">
        <h2>Programming Skills</h2>
        <ul>
          <li><strong>Languages:</strong> {programming_skills.languages.join(', ')}                   
            {programming_skills.languages.includes('Azure DevOps') && <AzuredevopsOriginal />}
            {programming_skills.languages.includes('C++') && <CplusplusPlain />}
            {programming_skills.languages.includes('C#') && <CsharpLine />}
            {programming_skills.languages.includes('.Net') && <DotNetPlain />}
            {programming_skills.languages.includes('Maya') && <MayaOriginal />}
            {programming_skills.languages.includes('Javascript') || programming_skills.languages.includes('JavaScript') && <JavascriptOriginal />}
            {programming_skills.languages.includes('Python') && <PythonOriginal />}
            {programming_skills.languages.includes('React') && <ReactOriginal />}
            {programming_skills.languages.includes('Unreal Engine') && <UnrealengineOriginal />}
            {programming_skills.languages.includes('Unity') && <UnityPlain />}
            {programming_skills.languages.includes('Typescript') && <TypescriptOriginal />}</li>
          <li><strong>Technologies:</strong> {programming_skills.technologies.join(', ')}</li>
        </ul>
      </section>

      {/* Hobbies */}
      <section className="hobbies">
        <h2>Hobbies</h2>
        <ul>
          {hobbies.map((hobby, index) => (
            <li key={index}><strong>{hobby}:</strong> {hobby}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CV;
