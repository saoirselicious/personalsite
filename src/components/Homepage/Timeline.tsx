import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import ComputerIcon from '@mui/icons-material/Computer';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import PianoIcon from '@mui/icons-material/Piano';

// Define your job experiences as an array of objects
const experiences = [
    {
        title: "General Motors Ireland",
        role: "Full Stack Engineer",
        startDate: "Nov 2023",
        endDate: "Present",
        icon: DeveloperBoardIcon,
        projects: [
            {
                title: "AutoQA Dashboard",
                info: "Led development of a dashboard, tracking the progress of automating QA processes.",
                tech: ["React", ".Net", "Azure DevOps"]
            },
            {
                title: "Application Monitoring",
                info: "Developed an application to monitor GM applications & improve outage management.",
                tech: ["React", ".Net"]
            }
        ]
    },
    {
        title: "General Motors Ireland",
        role: "Immersive Software Developer",
        startDate: "July 2021",
        endDate: "Nov 2023",
        icon: ComputerIcon,
        projects: [
            {
                title: "Metahuman Chatbot",
                info: "Created a Character Interaction System for GM’s chatbot using AI for emotion detection.",
                tech: ["Unreal Engine", "Python", "JavaScript"]
            },
            {
                title: "Process Automation",
                info: "Developed automation tools to save over 100 hours per visualizer.",
                tech: ["C++", "Unreal Engine", "Python"]
            },
            {
                title: "Tool Development",
                info: "Built the Visualiser Toolkit, including Maya plugins.",
                tech: ["Python", "C++", "Maya", "Deltagen", "Unreal Engine"]
            },
            {
                title: "POC Development",
                info: "Various POCs such as a digital brochure and WebGL video conferencing for Hololens.",
                tech: ["Unity", "C#"]
            }
        ]
    },
    {
        title: "General Motors Ireland",
        role: "Immersive Software Apprentice",
        startDate: "July 2020",
        endDate: "June 2021",
        icon: ViewInArIcon,
        projects: [
            {
                title: "Panoramic Environment Template",
                info: "Website combining panoramic images with interactive hot spots.",
                tech: ["JavaScript", "HTML", "WebGL"]
            },
            {
                title: "Metadata Implementation",
                info: "Led creation of a tool to extract design files data and apply it as metadata to JT files.",
                tech: ["C++"]
            }
        ]
    },
    {
        title: "Self-employed",
        role: "Music Teacher",
        startDate: "Aug 2013",
        endDate: "June 2020",
        icon: PianoIcon,
        projects: [] // No projects listed
    }
];

export default function Expierence() {
    return (
        <Timeline position="alternate">
            {experiences.map((exp, index) => (
                <TimelineItem key={index}>
                    <Typography>{`${exp.startDate} - ${exp.endDate}`}</Typography>
                    <TimelineSeparator>
                        <TimelineDot
                            sx={{
                                backgroundColor: 'transparent', // Optional: set a background color
                                border: '2px solid #1976d2', // Customize border color
                                padding: '4px', // Padding to create space around the icon
                            }}
                        >
                            {React.createElement(exp.icon, { sx: { color: '#1976d2' } })} {/* Adjust color if needed */}
                        </TimelineDot>
                        {index < experiences.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>{`${exp.title} (${exp.role})`}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {exp.projects.length > 0 ? (
                                        <ul>
                                            {exp.projects.map((project, idx) => (
                                                <li key={idx}>
                                                    <b>{project.title}:</b> {project.info} (Tech: {project.tech.join(', ')})
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <Typography>No projects listed</Typography>
                                    )}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
}
