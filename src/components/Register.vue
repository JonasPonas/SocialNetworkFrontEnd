<template>
    <form id="inputs-container">
        <input type="text" ref="name" placeholder="Name:" autocomplete="true">
        <input type="text" ref="surname" placeholder="Surname:" autocomplete="true">
        <input type="text" ref="email" id="emailas" placeholder="Email:" autocomplete="true">
        <input type="tel" ref="phone" placeholder="Phone Nr:" autocomplete="true">
        <input type="date" ref="birthday" placeholder="Date of Birth:" autocomplete="true">
        <input type="password" ref="password" placeholder="Password:" autocomplete="false">
        <input type="password" ref="rPassword" placeholder="Repeat Password:" autocomplete="false">
    </form>
</template>