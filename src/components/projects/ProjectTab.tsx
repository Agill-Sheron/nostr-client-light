import React from 'react';
import { Project } from '../../types/Project';
import { Box, Image, Text, useClipboard, Divider } from '@chakra-ui/react';
import defaultImage from '../../assets/default_image.png';
import { FiCopy } from 'react-icons/fi';
import geyserIcon from '../../assets/geyser-icon.png'; 

interface ProjectTabProps {
  project: Project;
}

const ProjectTab: React.FC<ProjectTabProps> = ({ project }) => {
  const { hasCopied, onCopy } = useClipboard(project.nip05 || '');

  return (
    <Box p="5">
      <Image src={project.banner || project.image || defaultImage} alt={`Image of ${project.display_name}`} />
      <Text fontSize="xl" fontWeight="bold" mt="2">
        {project.display_name}
      </Text>
      <Text mt="2">{project.about}</Text>
      <Box mt="4" display="flex" flexDirection="row" gap="2" justifyContent="start">
        <Box mt="2" display="flex" gap={4} alignItems="center" cursor="pointer" onClick={onCopy}>
            <Text> ⚡️ {project.nip05}</Text>
            {hasCopied ? <Text ml="2">(Copied!)</Text> : <FiCopy />}
        </Box>
        <Divider orientation="vertical" height="48px" ml={2} mx="1"/> 
        <Box display="flex" flexDirection="row" gap="2" alignItems="center">
            <a href={project.website} target="_blank" rel="noopener noreferrer">
                <Image src={geyserIcon} alt="Website icon" boxSize="48px" ml="2" />
            </a>
        </Box>     
      
      </Box>
    </Box>
  );
};

export default ProjectTab;