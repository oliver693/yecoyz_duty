import React from 'react';
import { UserCircle } from 'lucide-react';
import { useTranslation } from "../contexts/TranslationProvider";

function EmptyState() {
  const { t } = useTranslation();
  const styles = {
    noWorkers: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: '#a0a0a0',
      fontFamily: "var(--font)",
      textAlign: 'center',
      padding: '20px'
    },
    noWorkersIcon: {
      marginBottom: '16px',
      opacity: 0.5
    },
    noWorkersText: {
      fontSize: '16px',
      marginBottom: '8px'
    },
    noWorkersSubtext: {
      fontSize: '14px',
      opacity: 0.7
    }
  };

  return (
    <div style={styles.noWorkers}>
      <UserCircle size={60} color="#666" style={styles.noWorkersIcon} />
      <div style={styles.noWorkersText}>{t("ui_NoWorkersAvalibale")}</div>
      <div style={styles.noWorkersSubtext}>{t("ui_WorkersWillAppearWhenAdded")}</div>
    </div>
  );
}

export default EmptyState;