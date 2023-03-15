import { FC, useCallback } from "react";
import { UniversityCardProps } from "./types";
import { StarBorderOutlined, LaunchOutlined, Star } from "@mui/icons-material";
import { Grid, Box, Typography } from "@mui/material";
import { useAuth } from "../../providers/auth/auth.hook";
import { useProfile } from "../../providers/profile/profile.hook";
import { UniversityEntity } from "../../common/entities";

export const UniversityCard: FC<UniversityCardProps> = ({
  university,
  fullWidth,
  onClickDetail,
  hideDetail,
}) => {
  const [{ authenticated, loggedUser }] = useAuth();
  const [{ updateProfileLoading }, { addUniversity, removeUniversity }] =
    useProfile();
  const onClick = useCallback(() => {
    if (!authenticated || hideDetail) return;
    onClickDetail?.(university);
  }, [university, onClickDetail]);
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          width: "100%",
          maxWidth: fullWidth ? "100%" : "500px",
          margin: "auto",
          backgroundColor: "white",
          boxShadow:
            "0px 6px 12px rgba(0, 0, 0, 0.06), 0px 12px 18px rgba(0, 0, 0, 0.1)",
          padding: "16px 32px",
          display: "flex",
          gap: "16px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "flex-start",
              cursor: "pointer",
            }}
            onClick={onClick}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "160%",
                maxWidth: "200px",
              }}
            >
              {university.name}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "160%",
                color: "#636C7E",
              }}
            >
              {university.country}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            {authenticated && (
              <>
                {loggedUser?.universities?.some(
                  (x) => x.name === university.name
                ) ? (
                  <Star
                    onClick={() =>
                      !updateProfileLoading && removeUniversity(university)
                    }
                    sx={{
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      color: "#FFC233",
                    }}
                  />
                ) : (
                  <StarBorderOutlined
                    onClick={() =>
                      !updateProfileLoading && addUniversity(university)
                    }
                    sx={{
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      color: "#9196A1",
                    }}
                  />
                )}
                {!hideDetail && (
                  <LaunchOutlined
                    onClick={onClick}
                    sx={{
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      color: "#9196A1",
                    }}
                  />
                )}
              </>
            )}
          </Box>
        </Box>
        <Typography
          variant="body1"
          color="#636C7E"
          onClick={onClick}
          sx={{
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {university.name}
        </Typography>
      </Box>
    </Grid>
  );
};
