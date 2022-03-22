import React, { useState } from 'react';
import iconBlack from '../assets/icon-left-font-monochrome-black.svg';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
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
import Searchbar from './Searchbar';
import { useNavigate } from 'react-router-dom';
// import { FaUser } from 'react-icons/fa';
import defaultUser from '../assets/default-user-icon.jpg';

const HeaderUserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // console.log(user.user[0].username);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/logout');
  };
  const userPopoverId = useGeneratedHtmlId({ prefix: 'userPopover' });
  const [isOpen, setIsOpen] = useState(false);

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
      {' '}
      {user ? (
        <EuiAvatar name={user.user[0].username} size="s" />
      ) : (
        <EuiAvatar name="Default" size="s" imageUrl={defaultUser} />
      )}
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
            {user ? (
              <EuiAvatar name={user.user[0].username} size="xl" />
            ) : (
              <EuiAvatar name="Default" size="xl" imageUrl={defaultUser} />
            )}
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiText>{user ? <p>{user.user[0].username}</p> : ''}</EuiText>

            <EuiSpacer size="m" />

            <EuiFlexGroup>
              <EuiFlexItem>
                {user ? (
                  <EuiFlexGroup justifyContent="spaceBetween">
                    <EuiFlexItem grow={false}>
                      <EuiLink href="/profile">Edit profile</EuiLink>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                      <EuiLink onClick={onLogout}>Log out</EuiLink>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                ) : (
                  <EuiFlexGroup justifyContent="spaceBetween">
                    <EuiFlexItem grow={false}>
                      <EuiLink href="/login">Login</EuiLink>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                      <EuiLink href="/register">Register</EuiLink>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                )}
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiPopover>
  );
};

export const Navbar = () => {
  const users = useSelector(selectAllUsers);

  return (
    <>
      <EuiHeader position="fixed">
        <EuiHeaderSection>
          <EuiHeaderSectionItem>
            <Link to="/" style={{ display: 'flex', marginLeft: 10 }}>
              <img
                style={{ height: 30 }}
                alt="Groupomania logo"
                src={iconBlack}
              />
            </Link>
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
