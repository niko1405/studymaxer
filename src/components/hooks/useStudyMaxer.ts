import { useContext } from "react";
import { StudyMaxerContext } from "../../context/StudyMaxerProvider";

const useStudyMaxer = () => {
  const context = useContext(StudyMaxerContext);
  
  if (context === null) {
    throw new Error('useStudyMaxer can only be used inside StudyMaxerProvider.');
  }
  
  return context;
}

export default useStudyMaxer;