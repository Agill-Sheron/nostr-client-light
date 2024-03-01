import { SimpleGrid, Box, Image, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button, Skeleton, SkeletonText } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { fetchProjectEvents } from '../../services/nostrService';
import { Project } from '../../types/Project';
import defaultImage from '../../assets/default_image.png';
import ProjectCard from './ProjectCard'; 

const ProjectsGrid: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true); 
      const fetchedProjects = await fetchProjectEvents();
      setProjects(fetchedProjects);
      setIsLoading(false); 
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (project: Project): void => {
    setSelectedProject(project);
    onOpen();
  };

  if (isLoading) {
    return (
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={10}>
        {Array.from({ length: 8 }).map((_, index) => ( 
          <Box key={index} p="4" shadow="md" borderWidth="1px">
            <Skeleton height="300px" width={"250px"} />
            <SkeletonText mt="2" noOfLines={2} spacing="4" />
          </Box>
        ))}
      </SimpleGrid>
    );
  }

  return (
    <>
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={10}>
        {projects.map((project: Project) => (
          <Box 
            key={project.name} 
            p="5" 
            shadow="md" 
            borderWidth="1px" 
            cursor="pointer" 
            onClick={() => handleProjectClick(project)}
            transition="transform 0.2s ease-in-out"
            _hover={{
              transform: 'scale(1.05)', 
            }}
           >
            <Image src={project.image || defaultImage} alt={`Image of ${project.display_name}`} />
            <Text mt="2">{project.display_name}</Text>
          </Box>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedProject?.display_name}</ModalHeader>
          <ModalBody>
            {selectedProject && <ProjectCard project={selectedProject} />}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectsGrid;