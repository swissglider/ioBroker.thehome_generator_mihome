import React from 'react';
import { Box } from 'grommet';

export interface I_SkeletonDivider_Props {
    skeleton: boolean;
}

const SkeletonDivider = ({ skeleton }: I_SkeletonDivider_Props) => {
    return <Box border={[{ color: skeleton ? 'dark-3' : 'brand', size: 'small', side: 'bottom' }]} />;
};

export default SkeletonDivider;
