import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import StarIcon from "@mui/icons-material/Star";

interface CardContainerProps {
  universityValue: {
    title: string;
    country: string;
  };
  onClick: () => void;
  onStarClick: () => void;
  onOpenAppClick: () => void;
  currentItems: any[]; 
  starData: any[];
  yellow: boolean;
}

const CardContainer: React.FC<CardContainerProps> = ({
  universityValue,
  onClick,
  onStarClick,
  onOpenAppClick,
  currentItems,
  starData,
  yellow,
}) => {
  const yellowColor = "#FFD700";

  const getColorByTitle = (title: string) => {
    const isStarred = starData?.some(
      (starElement) => starElement.title === title
    );
    return isStarred ? yellowColor : yellow ? yellowColor : "black";
  };

  return (
    <Card sx={{ maxWidth: 420 }} onClick={onClick}>
      {universityValue?.title ? <>
      <CardHeader
        action={<>
          <IconButton aria-label="settings" onClick={onStarClick}>
            <StarIcon
              sx={{ color: getColorByTitle(universityValue.title) }} />
          </IconButton>
          <IconButton aria-label="settings" onClick={onOpenAppClick}>
            <OpenInNewIcon />
          </IconButton>
        </>}
        title={`${universityValue?.title} ${universityValue?.country}`} /><CardContent>
          <Typography variant="body2" color="text.secondary">
            We'd like to see a proposal to enrich this module
          </Typography>
        </CardContent>
        </> : <p style={{padding:10}}>No Data Found</p>}
    </Card>
  );
};

export default CardContainer;
