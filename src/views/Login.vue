<template>
    <el-container style="background-color: #2d3a4b;">
        <el-main style="margin-top: 40px; color: #fff">
            <el-row :gutter="20">
                <el-col :span="6" :offset="9">
                    <div style="text-align: center; margin-bottom: 55px;">

                        <div class="login-header">
                            <!-- <p style="font-size: 35px; margin-bottom: 0px; font-weigh: bold;">GSAX App</p> -->
                            <img src="@/assets/app_logo.png" alt="" style="width: 35%;">
                            <h3>Login</h3>
                        </div>

                        <el-form >
                            <el-form-item>
                                <el-input placeholder="Usuario" v-model="credenciales.usuario">
                                    <i slot="prefix" class="el-input__icon fas fa-user"></i>
                                </el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-input placeholder="Password" type="password" v-model="credenciales.password">
                                    <i slot="prefix" class="el-input__icon fas fa-lock"></i>
                                </el-input>
                            </el-form-item>

                            <el-button type="primary" style="width: 100%;" @click="doLogin()"><strong>Login</strong></el-button>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: 'Login',
        data(){
            return {
                credenciales: {
                    usuario: "",
                    password: ""
                }
            }
        },
        methods: {
            doLogin: function(){
                let _this = this;
                // -- validacion de formulario aqui

                if (_this.credenciales.usuario !== 'cesarmedina' || _this.credenciales.password !== 'element' ){
                    // -- muestra error de credenciales invalida
                    this.$notify.error({
                        title: 'Error',
                        message: 'Verifique sus credenciales.',
                    });
                    return false;
                }

                // redirecciona al dashboard
                _this.$router.push({name: 'dashboard'});
            }
        }
    }
</script>


<style scoped>
    .el-input input {
        background: transparent;
        color: #eee;
        padding: 12px 5px 12px 15;
        border-radius: 0;
    }
</style>
