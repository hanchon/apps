// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type BackArrowIconProps = React.SVGAttributes<SVGElement> & {
    color?: string;
};

export const BackArrowIcon: React.FC<BackArrowIconProps> = ({
    width = "33",
    height = "12",
    color = "currentColor",
    ...restProps
}) => {
    return (
        <svg width={width} {...restProps} color={color}
            height={height} viewBox="0 0 33 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.5 6.75C31.9142 6.75 32.25 6.41421 32.25 6C32.25 5.58579 31.9142 5.25 31.5 5.25L31.5 6.75ZM0.969671 5.46967C0.676777 5.76256 0.676777 6.23743 0.969671 6.53033L5.74264 11.3033C6.03554 11.5962 6.51041 11.5962 6.8033 11.3033C7.09619 11.0104 7.09619 10.5355 6.8033 10.2426L2.56066 6L6.8033 1.75736C7.0962 1.46446 7.0962 0.98959 6.8033 0.696697C6.51041 0.403804 6.03554 0.403804 5.74264 0.696697L0.969671 5.46967ZM31.5 5.25L1.5 5.25L1.5 6.75L31.5 6.75L31.5 5.25Z" fill={color} />
        </svg>
    );
};
