import React, { useState } from 'react';
import iconBlack from '../assets/iconBlack.png';
import { useDispatch } from 'react-redux';
import { signOut } from '../features/auth/authSlice';
import {
  EuiAvatar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiLink,
  EuiPopover,
  EuiSpacer,
  EuiText,
  EuiHeaderLinks,
  EuiHeaderLink,
  useGeneratedHtmlId,
} from '@elastic/eui';
import { selectAllUsers } from '../features/users/usersSlice';
import { useSelector } from 'react-redux';
import Searchbar from './Searchbar';
import {} from 'react-icons/fa';

const HeaderUserMenu = () => {
  const userPopoverId = useGeneratedHtmlId({ prefix: 'userPopover' });
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={userPopoverId}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Account menu"
      onClick={onMenuButtonClick}
    >
      <EuiAvatar name="John Username" size="s" />
    </EuiHeaderSectionItemButton>
  );

  return (
    <EuiPopover
      id={userPopoverId}
      repositionOnScroll
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="none"
    >
      <div style={{ width: 320 }}>
        <EuiFlexGroup
          gutterSize="m"
          className="euiHeaderProfile"
          responsive={false}
        >
          <EuiFlexItem grow={false}>
            <EuiAvatar name="John Username" size="xl" />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiText>
              <p>John Username</p>
            </EuiText>

            <EuiSpacer size="m" />

            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFlexGroup justifyContent="spaceBetween">
                  <EuiFlexItem grow={false}>
                    <EuiLink href="/profile">Edit profile</EuiLink>
                  </EuiFlexItem>

                  <EuiFlexItem grow={false}>
                    <EuiLink onClick={() => dispatch(signOut())} href="/logout">
                      Log out
                    </EuiLink>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiPopover>
  );
};

export const Navbar = () => {
  // const [theme, setTheme] = useState('default');
  const users = useSelector(selectAllUsers);

  return (
    <>
      <EuiHeader position="fixed">
        <EuiHeaderSection>
          <EuiHeaderSectionItem border="right">
            <img
              style={{ height: 150 }}
              alt="Groupomania logo"
              src={iconBlack}
            />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
        <EuiHeaderSection grow={false}>
          <EuiHeaderSectionItem>
            <EuiHeaderLinks aria-label="App navigation links example">
              <EuiHeaderLink href="/">Feed</EuiHeaderLink>
              <EuiHeaderLink href="/users">Users</EuiHeaderLink>
              <Searchbar placeholder="Find a user..." data={users} />
            </EuiHeaderLinks>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
        <EuiHeaderSection side="right">
          <EuiHeaderSectionItem>
            <HeaderUserMenu />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
    </>
  );
};
