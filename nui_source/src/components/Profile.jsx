import React, { useState, useEffect } from 'react';
import { UserCircle, Clock, LogIn, LogOut } from 'lucide-react';
import { useVisibility } from '../contexts/VisibilityContext';
import { callback } from '../utilites/callback';
import { useTranslation } from "../contexts/TranslationProvider";

const Profile = () => {
  const { t } = useTranslation();
  const { characterData, toggleDuty, isVisible } = useVisibility();
  const { name, job, grade, isOnDuty, dutyStarted } = characterData;
  const [dutyTime, setDutyTime] = useState(0);
  
  useEffect(() => {
    let timer;
    if (isOnDuty) {
      const startTime = dutyStarted ? new Date(dutyStarted * 1000) : new Date();
      
      // Beräkna och sätt det initiala värdet direkt
      const currentTime = new Date();
      const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
      setDutyTime(elapsedSeconds);
      
      timer = setInterval(() => {
        const currentTime = new Date();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        setDutyTime(elapsedSeconds);
      }, 1000);
    } else {
      setDutyTime(0);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOnDuty, dutyStarted]);
  
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
  
    return `${hours}:${minutes}:${remainingSeconds}`;
  };
  
  const handleDutyToggle = () => {
    callback("toggleDuty").then((res) => {
      toggleDuty(res.isOnDuty, res.dutyStarted)
    })
  }
  
  const dotColor = isOnDuty ? '#2C974B' : '#E5534B';
  const textColor = '#a0a0a0';
  
  const profileStyle = {
    container: {
      padding: '16px',
      backgroundColor: '#252525',
      borderBottom: '1px solid #333',
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    avatarContainer: {
      width: '80px',
      height: '80px',
      borderRadius: '12px',
      overflow: 'hidden',
      backgroundColor: '#333',
      border: '2px solid #444',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0
    },
    contentContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    infoSection: {
      display: 'flex',
      flexDirection: 'column'
    },
    name: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#e0e0e0',
      marginBottom: '4px',
      fontFamily: "var(--font)"
    },
    job: {
      fontSize: '14px',
      color: '#a0a0a0',
      marginBottom: '2px',
      fontFamily: "var(--font)"
    },
    grade: {
      fontSize: '12px',
      color: '#a0a0a0',
      fontFamily: "var(--font)"
    },
    buttonSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'center'
    },
    statusIndicator: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px',
      fontFamily: "var(--font)",
      fontSize: '12px',
      color: textColor
    },
    statusDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: dotColor,
      marginRight: '6px'
    },
    button: {
      backgroundColor: isOnDuty ? '#2C974B' : '#4dabf7',
      color: '#1a1a1a',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 14px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontFamily: "var(--font)",
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '6px',
      outline: 'none',
      whiteSpace: 'nowrap'
    },
    dutyTimeContainer: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '12px',
      color: textColor,
      marginBottom: '8px',
      fontFamily: "var(--font)"
    },
    dutyTimeIcon: {
      marginRight: '6px',
      color: isOnDuty ? '#2C974B' : textColor
    }
  };
  
  return (
    <div style={profileStyle.container}>
      <div style={profileStyle.avatarContainer}>
        <UserCircle size={60} color="#666" />
      </div>
      
      <div style={profileStyle.contentContainer}>
        <div style={profileStyle.infoSection}>
          <div style={profileStyle.name}>{name}</div>
          <div style={profileStyle.job}>{job}</div>
          <div style={profileStyle.grade}>{t("ui_profileGrade")} {grade}</div>
        </div>
        
        <div style={profileStyle.buttonSection}>
          <div style={profileStyle.statusIndicator}>
            <div style={profileStyle.statusDot}></div>
            {isOnDuty ? t("ui_proflieOnDuty") : t("ui_proflieOffDuty")}
          </div>
          
          <div style={profileStyle.dutyTimeContainer}>
            <Clock size={12} color={isOnDuty ? '#2C974B' : textColor} style={profileStyle.dutyTimeIcon} />
            {isOnDuty ? formatTime(dutyTime) : '00:00:00'}
          </div>
          
          <button
            style={profileStyle.button}
            onClick={handleDutyToggle}
          >
            {isOnDuty ? (
              <>
                <LogOut size={16} />
                {t("ui_proflieGoOffDuty")}
              </>
            ) : (
              <>
                <LogIn size={16} />
                {t("ui_proflieGoOnDuty")}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;