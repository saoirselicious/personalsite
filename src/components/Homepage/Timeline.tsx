import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { fetchTimelineContent } from '../Utilities/TimelineUtility';
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
import { useLoading, useError } from '../Splashscreen/SplashScreen';

interface Project {
    title: string;
    info: string;
    tech: string[];
}

interface myExperience {
    title: string;
    role: string;
    startDate: string;
    endDate: string | "Present";
    icon: React.ReactNode;
    projects: Project[];
}

export default function Experience() {
    const [data, setData] = useState<myExperience[]>([]);
    const { loading,setLoading } = useLoading();
    const { setError } = useError();

    useEffect(() => {
        setLoading(true);
        fetchTimelineContent()
            .then((result) => {
                if (result) {
                    const experiencesArray = Object.entries(result as Record<string, any>).map(([company, details]) => ({
                        title: company,
                        role: details.role,
                        startDate: details.start_date,
                        endDate: details.end_date || "Present",
                        icon: details.icon,
                        projects: details.projects || [],
                    }));
                    setData(experiencesArray);
                } else {
                    setData([]);
                }
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [setError, setLoading]);

    return (
        <Container maxWidth="xl" sx={{ textAlign: 'center', padding: '2rem 0' }}>
            <Timeline position="alternate">
                {data?.length === 0 && loading === false? (
                    <p>No experience data available</p>
                ) : (
                    data?.map((exp, index) => (

                        <TimelineItem
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <Typography>
                                {`${exp.startDate} - ${exp.endDate}`}
                            </Typography>
                            <TimelineSeparator
                                sx={{
                                    flex: '0 0 auto',
                                    marginLeft: '5px',
                                    marginRight: '5px',
                                }}
                            >
                                <TimelineDot
                                    sx={{
                                        backgroundColor: 'transparent',
                                        border: '2px solid var(--primary-color)',
                                    }}
                                >
                                    {typeof exp.icon === 'function' ? React.createElement(exp.icon, { sx: { color: 'var(--primary-color)' } }) : null}
                                </TimelineDot>
                                {index < data?.length - 1 && <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent>
                                <Accordion sx={{
                                    borderRadius: '10px',
                                    border: 'none',
                                    justifyContent: 'space-between',
                                    background: 'none'
                                }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{
                                        backgroundColor: 'var(--card-background-color)',
                                        color: 'var(--text-color)',
                                        borderRadius: '10px',
                                        justifyContent: 'space-between',
                                    }}>
                                        <Typography>{`${exp.title} (${exp.role})`}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{
                                        backgroundColor: 'var(--highlight-background-color)',
                                        color: 'var(--text-color)',
                                        textAlign: 'left',
                                        borderRadius: '10px',
                                    }}>
                                        <Typography>
                                            {exp.projects?.length > 0 ? (
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
                    ))
                )}
            </Timeline>
        </Container>
    );
}
