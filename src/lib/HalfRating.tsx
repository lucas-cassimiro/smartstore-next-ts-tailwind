import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";

interface RatingProps {
  star: number;
}

export default function HalfRating({ star }: RatingProps) {
  return (
    <Stack spacing={1} className="#faff00">
      <Rating
        name="half-rating-read"
        defaultValue={star}
        precision={0.5}
        readOnly
      />
    </Stack>
  );
}
