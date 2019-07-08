import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Formik, FormikProps } from 'formik';
import { useMutation } from 'react-apollo-hooks';
import { loader } from 'graphql.macro';
import { Button, Icon, Form as AntForm, Typography } from 'antd';
import { Form } from '../../shared/components/Form';
import { AuthBg, AuthContent, AuthWrapper } from '../../shared/styled/Shared';
import { InputField } from '../../shared/components/InputField';
import { registerFormikConfig } from '../../shared/formUtils/register';
import { RegisterInput, RegisterMutation, RegisterMutationVariables } from '../../shared/types/generated';
import { Routes } from '../../shared/constants/routes';
import { Link } from 'react-router-dom';
import { Flex } from '../../shared/components/Flex';

const { Item } = AntForm;
const registerMutation = loader('../../shared/graphql/user/RegisterMutation.graphql');

type Props = RouteComponentProps<{}>;

export const Register: React.FC<Props> = ({ history }) => {
  const register = useMutation<RegisterMutation, RegisterMutationVariables>(registerMutation);

  return (
    <AuthWrapper>
      <AuthContent centerAll={true}>
        <Formik {...registerFormikConfig(register, history)}>
          {({ isSubmitting, status }: FormikProps<RegisterInput>) => {
            const content = (status && status.user) ? (
              <Flex flexDirection="column" centerAll={true} style={{ maxWidth: 350 }}>
                <Typography.Title level={2} style={{ textAlign: 'center' }}>
                  Thanks for signing up!
                </Typography.Title>

                <Typography.Paragraph style={{ textAlign: 'center' }}>
                  We sent an confirmation link to {status.user.email}.
                  To complete registration, just follow the link and then start using the app.
                </Typography.Paragraph>
              </Flex>
            ) : (
              <Form
                title="Register"
                formError={status && status.formError}
                style={{ minWidth: 350 }}
              >
                <InputField
                  name="firstName"
                  placeholder="first name"
                  size="large"
                />

                <InputField
                  name="lastName"
                  placeholder="last name"
                  size="large"
                />

                <InputField
                  prefix={<Icon type="user"/>}
                  name="email"
                  placeholder="email"
                  type="email"
                  size="large"
                />

                <InputField
                  prefix={<Icon type="lock"/>}
                  name="password"
                  placeholder="password"
                  type="password"
                  size="large"
                />

                <Item style={{ marginBottom: 15 }}>
                  <Button
                    block={true}
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Register
                  </Button>
                </Item>

                <Link to={Routes.LOGIN}>Login now!</Link>
              </Form>
            );

            return content;
          }}
        </Formik>
      </AuthContent>

      <AuthBg/>
    </AuthWrapper>
  );
};