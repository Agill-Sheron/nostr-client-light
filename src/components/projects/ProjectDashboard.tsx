import React from 'react';
import { Project } from '../../types/Project';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import ProjectTab from './ProjectTab';
import ProjectLinksTab from './ProjectLinksTab';

interface ProjectDashboardProps {
  project: Project;
}

const ProjectDashboard: React.FC<ProjectDashboardProps> = ({ project }) => {

  return (
    <Box p="5" width="100%">
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>General</Tab>
          <Tab>Links</Tab>
          <Tab>Zaps</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProjectTab project={project} />
          </TabPanel>
          <TabPanel>
            <ProjectLinksTab pubkey={project.pubkey} />
          </TabPanel>
          <TabPanel>
        
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProjectDashboard;