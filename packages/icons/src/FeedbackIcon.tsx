// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type FeedbackIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const FeedbackIcon: React.FC<FeedbackIconProps> = ({
  width = "38",
  height = "37",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 38 37"
      fill="none"
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <g clipPath="url(#clip0_854_778)">
        <path
          d="M26.4467 27.6812L26.4325 28.4243C26.4192 29.1231 25.8419 29.6788 25.1431 29.6655L20.6425 29.5797C19.9436 29.5663 19.3879 28.989 19.4013 28.2902L19.4155 27.5471C19.4288 26.8482 20.0061 26.2926 20.705 26.3059L25.2055 26.3917C25.9044 26.4051 26.4601 26.9824 26.4467 27.6812Z"
          fill="#F2A74E"
        />
        <path
          d="M17.9917 11.3885C13.9046 11.3105 10.0198 12.423 9.99186 13.8861C9.98848 14.0631 10.0422 14.2371 10.1456 14.4065C10.1502 14.4168 10.155 14.4272 10.1606 14.4376C11.0557 16.07 13.3218 26.8198 13.723 29.2334C13.7686 29.5092 13.8954 29.7652 14.0871 29.9686C14.6116 30.5242 15.8093 31.5373 17.5951 31.5713C19.3937 31.6057 20.6518 30.5942 21.2005 30.0449C21.3958 29.8499 21.5297 29.602 21.5857 29.3317C22.0762 26.9566 24.7574 16.324 25.7102 14.7334C25.739 14.6854 25.7636 14.6371 25.7849 14.5889C25.8516 14.4592 25.8878 14.3258 25.8904 14.1894C25.8915 14.1167 25.8834 14.0441 25.8661 13.9735C25.8401 13.8297 25.7828 13.6933 25.6983 13.5742C25.7099 13.5994 25.7194 13.6255 25.7267 13.6523C24.9548 12.4298 21.568 11.4567 17.9917 11.3885Z"
          fill="#FFB636"
        />
        <path
          d="M17.9771 12.1587C21.5452 12.2268 24.899 13.2295 24.877 14.387C24.8549 15.5445 21.4652 16.4186 17.8972 16.3505C14.3292 16.2824 10.9753 15.2797 10.9974 14.1222C11.0194 12.9647 14.409 12.0906 17.9771 12.1587Z"
          fill="#CC883E"
        />
        <path
          d="M16.5408 28.1182C16.4695 28.2218 16.3781 28.31 16.272 28.3775C16.1659 28.445 16.0472 28.4904 15.9232 28.5111C15.4119 28.5968 14.9279 28.2518 14.8422 27.7405L14.3374 24.7294C14.2517 24.2181 14.5967 23.7341 15.108 23.6484C15.6193 23.5627 16.1033 23.9077 16.189 24.419L16.6938 27.4301C16.7344 27.6706 16.6795 27.9175 16.5408 28.1182Z"
          fill="#FFD469"
        />
        <path
          d="M17.6845 8.74293L16.7533 3.53112C16.7138 3.30982 16.8852 3.10714 17.1099 3.10935L18.6601 3.12445C18.8736 3.12653 19.0381 3.31353 19.0128 3.52558L18.3937 8.72227C18.3834 8.80754 18.3429 8.88629 18.2794 8.9442C18.216 9.00211 18.1339 9.03533 18.048 9.03783C17.9621 9.04033 17.8782 9.01194 17.8115 8.95783C17.7448 8.90371 17.6997 8.82746 17.6845 8.74293ZM20.6714 10.0475C20.7362 10.075 20.8088 10.0776 20.8753 10.0549C20.9419 10.0321 20.9977 9.98563 21.0321 9.92427L23.0677 6.29139C23.0873 6.2564 23.0993 6.21768 23.1029 6.17775C23.1066 6.13781 23.1017 6.09756 23.0888 6.05961C23.0758 6.02166 23.055 5.98687 23.0277 5.95751C23.0004 5.92814 22.9672 5.90486 22.9303 5.88918L21.795 5.40668C21.6304 5.33672 21.4428 5.43362 21.4045 5.60837L20.5043 9.72379C20.49 9.78877 20.499 9.85667 20.5295 9.91577C20.56 9.97487 20.6102 10.0214 20.6714 10.0475ZM15.2919 10.0977C15.3571 10.0714 15.4103 10.0219 15.4413 9.95879C15.4723 9.89565 15.4789 9.8233 15.4598 9.7556L14.3303 5.74741C14.3195 5.70881 14.3006 5.67294 14.2749 5.64213C14.2493 5.61132 14.2174 5.58627 14.1814 5.5686C14.1454 5.55093 14.1061 5.54105 14.066 5.53959C14.0259 5.53813 13.986 5.54513 13.9488 5.56014L12.8049 6.02169C12.639 6.08861 12.5749 6.28987 12.6714 6.44042L14.9449 9.98702C14.9807 10.043 15.035 10.0848 15.0984 10.105C15.1618 10.1252 15.2302 10.1226 15.2919 10.0977Z"
          fill="#59CAFC"
        />
      </g>
      <defs>
        <clipPath id="clip0_854_778">
          <rect
            width="26.0196"
            height="26.0196"
            fill="white"
            transform="translate(0.859375 21.4188) rotate(-55.4045)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
