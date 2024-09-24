import React, { useEffect, useState } from 'react';
import '../../App.css';
import { Container, Divider, Button } from '@mui/material';
import {
  AzuredevopsOriginal,
  CplusplusPlain,
  CsharpLine,
  Css3Plain,
  DotNetPlain,
  JavascriptOriginal,
  GitPlain,
  Html5Original,
  InsomniaPlain,
  MayaOriginal,
  PythonOriginal,
  ReactOriginal,
  UnrealengineOriginal,
  UnityPlain,
  VisualstudioPlain,
  VscodePlain,
  TypescriptOriginal,
} from 'devicons-react';
// import data from './sample.json';
import Tooltip from '@mui/material/Tooltip';
import { fetchCVContent } from '../Utilities/CvUtility';
import { useLoading } from '../Splashscreen/SplashScreen'

const skillIcons: { [key: string]: JSX.Element } = {
  'Azure DevOps': <AzuredevopsOriginal size="2em" />,
  'C++': <CplusplusPlain size="2em" />,
  'C#': <CsharpLine size="2em" />,
  'CSS': <Css3Plain size="2em" />,
  'Git': <GitPlain size="2em" />,
  'HTML': <Html5Original size="2em" />,
  'Insomnia': <InsomniaPlain size="2em" />,
  '.Net': <DotNetPlain size="2em" />,
  '.NET': <DotNetPlain size="2em" />,
  'Maya': <MayaOriginal size="2em" />,
  'Javascript': <JavascriptOriginal size="2em" />,
  'JavaScript': <JavascriptOriginal size="2em" />,
  'Python': <PythonOriginal size="2em" />,
  'React': <ReactOriginal size="2em" />,
  'Unreal Engine': <UnrealengineOriginal size="2em" />,
  'Visual Studio': <VisualstudioPlain size="2em" />,
  'VS Code': <VscodePlain size="2em" />,
  'Unity': <UnityPlain size="2em" />,
  'Typescript': <TypescriptOriginal size="2em" />
};

interface SkillItemProps {
  skills: string[];
}

const SkillItem: React.FC<SkillItemProps> = ({ skills }) => (
  <span>
    {skills.filter(skill => !skillIcons[skill]).join(', ')}
    {skills.map(skill => skillIcons[skill] && (
      <Tooltip title={skill} key={skill}>
        <span>{skillIcons[skill]}</span>
      </Tooltip>
    ))}
  </span>
);

interface ResumeInterface {
  summary: string;
  work_experience: WorkExperienceInterface[];
  education: EducationInterface[];
  programming_skills: ProgrammingSkillsInterface;
  hobbies: HobbiesInterface[];
}

interface WorkExperienceInterface {
  company: string;
  location: string;
  position: string;
  dates: string;
  description: string;
  projects?: ProjectInterface[];
}

interface ProjectInterface {
  name: string;
  description: string;
  technologies: string[];
}

interface EducationInterface {
  institution: string;
  degree: string;
  grade?: string;
  dates: string;
}

interface ProgrammingSkillsInterface {
  languages: string[];
  technologies: string[];
}

interface HobbiesInterface {
  name: string;
  description: string;
}

const CV: React.FC = () => {
  const [data, setData] = useState<ResumeInterface | null>(null);
  const [state, setState] = useState({ text: "Icon", isVisible: true });
  const { loading, setLoading } = useLoading();

  function showIcon() {
    console.log("showIcon");
    if (state.isVisible) {
      setState(prevState => ({
        ...prevState,
        text: "Text",
        isVisible: false,
      }));
    }
    else {
      setState(prevState => ({
        ...prevState,
        text: "Icon",
        isVisible: true,
      }));
    }

    console.log("Updated state:", state);
  }

  useEffect(() => {
    console.log("fetchCVContent")
    setLoading(true)
    fetchCVContent().then((result) => {
      console.log(result);
      setLoading(false);
      if (result) {
        const cvData: ResumeInterface = {
          summary: result.summary ? result.summary[0] : '',

          work_experience: result.work_experience ? result.work_experience.map((we: string[], index: number) => ({
            company: we[0],
            location: we[1],
            position: we[2],
            dates: we[3],
            description: we[4],
            projects: result.projects
              ? result.projects
                .filter((proj: any) => proj[0] === index + 1)
                .map((proj: any) => ({
                  name: proj[1] || '',
                  description: proj[2] || '',
                  technologies: proj[3] || []
                }))
              : []
          }))
            : [],

          education: result.education
            ? result.education.map((edu: string[]) => ({
              institution: edu[0],
              degree: edu[1],
              grade: edu[2] || undefined,
              dates: edu[3],
            }))
            : [],

          programming_skills: result.programming_skills
            ? {
              languages: result.programming_skills
                .filter((skill: any) => skill[0] === 'language')
                .map((skill: any) => skill[1]) || [],
              technologies: result.programming_skills
                .filter((skill: any) => skill[0] === 'technology')
                .map((skill: any) => skill[1]) || []
            }
            : {
              languages: [],
              technologies: []
            },

          hobbies: result.hobbies
            ? result.hobbies.map((hobby: any) => ({
              name: hobby[0], description: hobby[1]
            }))
            : []
        };
        setData(cvData);
      }
    })
  }, [setLoading])


  return (
    <Container maxWidth="xl" sx={{ padding: '2rem' }}>
      {loading ? null : data == null ? (
        <p>No experience data available</p>
      ) : (
        <div className="container">
          {/* Header */}
          <header className="header">
            <h1>Saoirse Seeber (she/her)</h1>
          </header>

          {/* Summary */}
          <Divider sx={{ bgcolor: 'var(--primary-color)', marginBottom: '0.5rem' }} />
          <section className="summary">
            <h2>Summary</h2>
            <Divider sx={{ bgcolor: 'var(--primary-color)', marginBottom: '0.5rem' }} />
            {data?.summary ? <p>{data.summary}</p> : <p>No summary available</p>}
          </section>

          {/* Work Experience */}
          <section className="experience">
            <h2>
              Work Experience{' '}
              <Button variant="contained" onClick={showIcon} sx={{ bgcolor: 'var(--secondary-color)' }}>
                {state.text}
              </Button>
            </h2>
            <Divider sx={{ bgcolor: 'var(--primary-color)', marginBottom: '0.5rem' }} />
            {data?.work_experience && data.work_experience.length > 0 ? (
              data.work_experience.map((job, index) => (
                <div className="job" key={index}>
                  <h3>{job.company}</h3>
                  <p>{job.location}</p>
                  <p>{job.position} | {job.dates}</p>
                  <ul>
                    {job.projects?.map((project, i) => (
                      <li key={i}>
                        <strong>{project.name}:</strong> <p>{project.description}</p>
                        {state.isVisible === true ? (
                          <SkillItem skills={project.technologies} />
                        ) : (
                          <p>{project.technologies.join(', ')}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No work experience available</p>
            )}
          </section>

          {/* Education */}
          <section className="education">
            <h2>Education</h2>
            <Divider sx={{ bgcolor: 'var(--primary-color)', marginBottom: '0.5rem' }} />
            {data?.education && data.education.length > 0 ? (
              data.education.map((degree, index) => (
                <div className="degree" key={index}>
                  <h3>{degree.institution}</h3>
                  <p>{degree.degree} | {degree.dates}</p>
                </div>
              ))
            ) : (
              <p>No education details available</p>
            )}
          </section>

          {/* Programming Skills */}
          <section className="skills">
            <h2>Programming Skills</h2>
            <Divider sx={{ bgcolor: 'var(--primary-color)', marginBottom: '0.5rem' }} />
            {data?.programming_skills ? (
              <>
                <strong>Languages:</strong>
                <ul>
                  {state.isVisible === true ? (
                    <SkillItem skills={data.programming_skills.languages} />
                  ) : (
                    <p>{data.programming_skills.languages.join(', ')}</p>
                  )}
                </ul>
                <strong>Technologies</strong>
                <ul>
                  {state.isVisible === true ? (
                    <SkillItem skills={data.programming_skills.technologies} />
                  ) : (
                    <p>{data.programming_skills.technologies.join(', ')}</p>
                  )}
                </ul>
              </>
            ) : (
              <p>No programming skills available</p>
            )}
          </section>

          {/* Hobbies */}
          <section className="hobbies">
            <h2>Hobbies</h2>
            <Divider sx={{ bgcolor: 'var(--primary-color)', marginBottom: '0.5rem' }} />
            {data?.hobbies && data.hobbies.length > 0 ? (
              <ul>
                {data.hobbies.map((hobby, index) => (
                  <li key={index}>
                    <strong>{hobby.name}:</strong> {hobby.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hobbies listed</p>
            )}
          </section>
        </div>
      )}
    </Container>
  );
}

export default CV;
