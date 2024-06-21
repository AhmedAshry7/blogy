import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "./Toolbar.module.css";
import blogIcon from "../assets/blogIcon.png";
import createIcon from "../assets/pen-fill.svg";

interface ToolbarProps {
    isCreate: boolean;
    homeClicked: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ isCreate, homeClicked }) => {
    const router = useRouter();
    
    const handleHomeClicked = () => {
        if (isCreate) {
            homeClicked();
        } else {
            router.push('/home');
        }
    }

    return (
        <div className={styles.toolbar}>
            <div className={styles.barButtons} onClick={handleHomeClicked}>
                <Image src={blogIcon} alt="blog icon" className={styles.icons} />
                <p className={styles.toolbarText}>blogy</p>
            </div>
            {!isCreate && (
                <div className={styles.barButtons} onClick={() => { router.push('/create'); }}>
                    <Image src={createIcon} alt="create icon" className={styles.icons} />
                    <p className={styles.toolbarText}>Create</p>
                </div>
            )}
        </div>
    );
}

export default Toolbar;
