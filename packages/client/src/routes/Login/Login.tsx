import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Formik, FormikProps } from 'formik';
import { Button, Icon, Form as AntForm } from 'antd';
import { Form } from '../../shared/components/Form';
import { AuthBg, AuthContent, AuthWrapper } from '../../shared/styled/Shared';
import { InputField } from '../../shared/components/InputField';
import { loginFormikConfig } from '../../shared/formUtils/login';
import { LoginInput } from '../../shared/types/generated';
import { Routes } from '../../shared/constants/routes';
import { useLogin } from '../../shared/hooks/user/useLogin';

const { Item } = AntForm;

type Props = RouteComponentProps<{}>;

export const Login: React.FC<Props> = ({ history }) => {
  const { login } = useLogin();

  return (
    <AuthWrapper>
      <AuthContent centerAll={true}>
        <Formik {...loginFormikConfig(login, history)}>
          {({ isSubmitting, status }: FormikProps<LoginInput>) => (
            <Form
              title="Login"
              formError={status && status.formError}
              style={{ minWidth: 350 }}
            >
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
                  Login
                </Button>
              </Item>

              <Link to={Routes.REGISTER} style={{ marginTop: 25 }}>Register now!</Link>
            </Form>
          )}
        </Formik>
      </AuthContent>

      <AuthBg/>
    </AuthWrapper>
  );
};