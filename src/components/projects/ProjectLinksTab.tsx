import React, { useEffect, useState } from 'react';
import { Box, Text, Divider, Link, Icon } from '@chakra-ui/react';
import { fetchProjectLinks } from '../../services/nostrService';
import { LinkCategories } from '../../types/LinkCategories';
import { FaGithub, FaTwitter, FaInstagram, FaLink } from 'react-icons/fa'; 
import nostrLogo from '../../assets/nostr_logo_blk.png'; 


interface ProjectLinksProps {
  pubkey: string;
}

const ProjectLinksTab: React.FC<ProjectLinksProps> = ({ pubkey }) => {
  const [links, setLinks] = useState<LinkCategories | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      const fetchedLinks = await fetchProjectLinks(pubkey);
      setLinks(fetchedLinks as LinkCategories | null);
    };
    fetchLinks();
  }, [pubkey]);


  const truncateLink = (link: string) => {
    const maxLength = 30;
    return link.length > maxLength ? link.substring(0, maxLength) + '...' : link;
  };
  

  // Function to render icon based on link type
  const renderIcon = (type: string) => {
    switch (type) {
      case 'github':
        return <Icon as={FaGithub} boxSize={6} _hover={{ transform: 'scale(1.1)' }} />;
      case 'twitter':
        return <Icon as={FaTwitter} boxSize={6} _hover={{ transform: 'scale(1.1)' }} />;
      case 'instagram':
        return <Icon as={FaInstagram} boxSize={6} _hover={{ transform: 'scale(1.1)' }} />;
      case 'nostr':
        return <img src={nostrLogo} alt="Nostr" style={{ width: '24px', height: '24px', transition: 'transform 0.2s' }} className="icon-hover" />;
      default:
        return <Icon as={FaLink} boxSize={6} _hover={{ transform: 'scale(1.1)' }} />; 
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap="4">
      {links?.github && links?.twitter && links?.instagram && links?.nostr && links?.other && links.other.length > 0 && (
        <>
          <Text fontSize="xl" fontWeight="bold">Main Links</Text>
          <Box mt="4" display="flex" flexDirection="row" justifyContent="start" gap="4">
            {links?.github && (
              <Link href={links.github} isExternal style={{ textDecoration: 'none' }}>
                {renderIcon('github')}
              </Link>
            )}
            {links?.twitter && (
              <Link href={links.twitter} isExternal style={{ textDecoration: 'none' }}>
                {renderIcon('twitter')}
              </Link>
            )}
            {links?.instagram && (
              <Link href={links.instagram} isExternal style={{ textDecoration: 'none' }}>
                {renderIcon('instagram')} 
              </Link>
            )}
            {links?.nostr && (
              <Link href={links.nostr} isExternal style={{ textDecoration: 'none' }}>
                {renderIcon('nostr')} 
              </Link>
            )}
          </Box>
          {links?.other && links.other.length > 0 && (
            <>
              <Divider my="4" />
            </>
          )}
        </>
      )}
     
      {links?.other && links.other.length > 0 && (
          <>
            <Text fontSize="xl" fontWeight="bold">Other Links</Text>

            <Box>
              {links.other.map((link, index) => (
                <Link key={index} href={link} isExternal style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {renderIcon('default')}
                  {truncateLink(link)}
                </Link>
              ))}
            </Box>
          </>
        )}
    </Box>
  );
};

export default ProjectLinksTab;
