import React from 'react';
import { Project } from '../../types/Project';
import { Box, Image, Text } from '@chakra-ui/react';
import defaultImage from '../../assets/default_image.png';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Box p="5">
      <Image src={project.banner || project.image || defaultImage} alt={`Image of ${project.display_name}`} />
      <Text fontSize="xl" fontWeight="bold" mt="2">
        {project.display_name}
      </Text>
      <Text mt="2">{project.about}</Text>
      <Text mt="2">LN Address: {project.nip05}</Text>
      <Text mt="2">Website: <a href={project.website} target="_blank" rel="noopener noreferrer">{project.website}</a></Text>
    </Box>
  );
};

export default ProjectCard;